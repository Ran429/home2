import { prisma } from "@/server/prisma/prisma.client";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 목록 조회
export async function GET() {
  const partners = await prisma.partner.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(partners);
}

// 생성
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const link = formData.get("link") as string | null;
    const description = formData.get("description") as string | null;
    const sortOrder = Number(formData.get("sortOrder") ?? 0);
    const file = formData.get("file") as File | null;

    if (!name) {
      return NextResponse.json({ error: "이름은 필수입니다." }, { status: 400 });
    }

    let logoUrl: string | null = null;

    // ✅ Supabase Storage 업로드
    if (file) {
      const fileName = `partners/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("uploads")
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("uploads")
        .getPublicUrl(fileName);

      logoUrl = urlData.publicUrl;
    }

    const partner = await prisma.partner.create({
      data: {
        name,
        logoImage: logoUrl || "", // 문자열
        link,
        description,
        sortOrder,
        isActive: true,
      },
    });

    return NextResponse.json(partner);
  } catch (err: any) {
    console.error("❌ 협력사 생성 오류:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
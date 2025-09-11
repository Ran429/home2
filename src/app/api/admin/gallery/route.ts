import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma/prisma.client";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const galleryType = formData.get("galleryType") as string; // ✅ 추가
    const files = formData.getAll("files") as File[];

    if (!title || !galleryType) {
      return NextResponse.json(
        { error: "제목과 갤러리 타입은 필수입니다." },
        { status: 400 }
      );
    }

    // ✅ 허용된 타입만 저장
    const validTypes = ["education-workshops", "publications-reports", "media-coverage"];
    if (!validTypes.includes(galleryType)) {
      return NextResponse.json(
        { error: "잘못된 갤러리 타입입니다." },
        { status: 400 }
      );
    }

    // Supabase 업로드
    const imageUrls: string[] = [];
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("uploads").upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage.from("uploads").getPublicUrl(fileName);
      imageUrls.push(urlData.publicUrl);
    }

    // DB 저장
    const gallery = await prisma.gallery.create({
      data: {
        title,
        description,
        images: imageUrls,
        thumbnail: imageUrls[0] ?? null,
        galleryType, // ✅ 이제 값 있음
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, gallery });
  } catch (err: any) {
    console.error("❌ 갤러리 생성 오류:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
// src/app/api/admin/upload/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // 서비스 롤 키 필요
);

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // 파일 이름 고유하게 만들기
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("uploads") // ✅ 버킷 이름
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 퍼블릭 URL 가져오기
  const { data: urlData } = supabase.storage.from("uploads").getPublicUrl(fileName);

  return NextResponse.json({ url: urlData.publicUrl });
}
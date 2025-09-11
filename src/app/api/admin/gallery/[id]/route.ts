// src/app/api/admin/gallery/[id]/route.ts
import { prisma } from "@/server/prisma/prisma.client";
import { NextResponse } from "next/server";

// ✅ 단일 조회
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const gallery = await prisma.gallery.findUnique({
    where: { id: Number(params.id) },
  });

  if (!gallery) {
    return NextResponse.json({ error: "갤러리를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json(gallery);
}

// ✅ 수정
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { title, description, galleryType } = await req.json();

  try {
    const updated = await prisma.gallery.update({
      where: { id: Number(params.id) },
      data: {
        title,
        description,
        galleryType,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ 갤러리 수정 에러:", error);
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

// ✅ 삭제
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.gallery.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ 갤러리 삭제 에러:", error);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
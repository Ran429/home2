import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma/prisma.client";

// 단일 조회
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const partner = await prisma.partner.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(partner);
}

// 수정
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();

  const updated = await prisma.partner.update({
    where: { id: Number(params.id) },
    data: {
      name: body.name,
      description: body.description,
      link: body.link,
      sortOrder: body.sortOrder ?? 0,
      logoImage: body.logos ? body.logos : undefined, // ✅ 새 로고 있으면 교체
    },
  });

  return NextResponse.json(updated);
}

// 삭제
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.partner.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ success: true });
}
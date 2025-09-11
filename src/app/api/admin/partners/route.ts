import { prisma } from "@/server/prisma/prisma.client";
import { NextResponse } from "next/server";

// 목록 조회
export async function GET() {
  const partners = await prisma.partner.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(partners);
}

// 생성
export async function POST(req: Request) {
  const body = await req.json();
  const partner = await prisma.partner.create({
    data: {
      name: body.name,
      logoImage: body.logoImage,
      link: body.link,
      description: body.description,
      sortOrder: body.sortOrder ?? 0,
    },
  });
  return NextResponse.json(partner);
}
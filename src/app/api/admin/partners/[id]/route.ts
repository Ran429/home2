import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma/prisma.client";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const partner = await prisma.partner.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(partner);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updated = await prisma.partner.update({
    where: { id: Number(params.id) },
    data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.partner.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ success: true });
}
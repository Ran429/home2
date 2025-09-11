// src/app/api/admin/pages/[slug]/route.ts
import { prisma } from "@/server/prisma/prisma.client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const page = await prisma.singlePage.findUnique({
  where: { slug: params.slug },
});

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  return NextResponse.json(page);
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { title, content } = await req.json();

  const updated = await prisma.singlePage.update({
    where: { slug: params.slug },
    data: { title, content },
  });

  return NextResponse.json(updated);
}
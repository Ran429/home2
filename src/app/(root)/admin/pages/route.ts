import { prisma } from "@/server/prisma/prisma.client";
import { NextResponse } from "next/server";

export async function GET() {
  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(pages);
}
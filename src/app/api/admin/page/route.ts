import { prisma } from "@/server/prisma/prisma.client";
import { NextResponse } from "next/server";

export async function GET() {
  const pages = await prisma.singlePage.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(pages);
}
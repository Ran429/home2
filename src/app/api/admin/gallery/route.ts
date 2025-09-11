import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma/prisma.client";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const boardType = formData.get("boardType") as string;
    const file = formData.get("file") as File | null;

    if (!title || !boardType) {
      return NextResponse.json(
        { error: "제목과 게시판 종류는 필수입니다." },
        { status: 400 }
      );
    }

    const validTypes = [
      "education-workshops",
      "publications-reports",
      "media-coverage",
    ];
    if (!validTypes.includes(boardType)) {
      return NextResponse.json(
        { error: "갤러리형 게시판만 허용됩니다." },
        { status: 400 }
      );
    }

    const newPost = await prisma.board.create({
      data: {
        title,
        content: content || "",
        boardType,
        files: file ? [file.name] : [],
        createdBy: "관리자",
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error("❌ 갤러리형 글 작성 에러:", error);
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
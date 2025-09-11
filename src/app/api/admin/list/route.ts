import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma/prisma.client";
import { BoardType } from "@/constants/board-type";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const boardType = formData.get("boardType") as string; // 어떤 게시판인지
    const file = formData.get("file") as File | null;

    if (!title || !content || !boardType) {
      return NextResponse.json(
        { error: "제목, 내용, 게시판 종류는 필수입니다." },
        { status: 400 }
      );
    }

    // ✅ BoardType 유효성 체크
    const validTypes = [
      "institute-events",
      "announcements",
      "research-projects",
      "social-contribution",
      "research-outcomes",
    ];
    if (!validTypes.includes(boardType)) {
      return NextResponse.json(
        { error: "리스트형 게시판만 허용됩니다." },
        { status: 400 }
      );
    }

    const newPost = await prisma.board.create({
      data: {
        title,
        content,
        boardType,
        files: file ? [file.name] : [],
        createdBy: "관리자",
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error("❌ 리스트형 글 작성 에러:", error);
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
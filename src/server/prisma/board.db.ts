import type { MainBoardType } from "@/@types/board-types";
import { BoardType, BoardTypes } from "@/constants/board-type";
import type { Board } from "@prisma/client";   // 타입만 import
import { prisma } from "./prisma.client";

type BoardTypeValue = typeof BoardType[keyof typeof BoardType];
/**
 * 메인페이지에서 사용할 게시판 아이템 로드
 */
async function getMainBoard(boardTypes: string[]) {
  const boardMap = new Map<string, MainBoardType[]>();
  const allBoardItems: MainBoardType[] = [];

  for (const boardType of boardTypes) {
    const boardItems = await prisma.board.findMany({
      select: {
        boardType: true,
        createdAt: true,
        id: true,
        title: true,
      },
      where: {
        boardType: boardType,
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    boardMap.set(boardType, boardItems);
    allBoardItems.push(...boardItems);
  }
  boardMap.set("ALL", allBoardItems);
  return boardMap;
}

/**
 * 메인페이지에서 사용할 갤러리 아이템 로드
 */
export const GALLERY_SHOWING_COUNT = 4;
export async function getMainGalleryItems() {
  return prisma.board.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      images: true,
    },
    where: {
      boardType: BoardType.GALLERY.code,
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: GALLERY_SHOWING_COUNT,
  });
}

export function getBoardItem(boardId: number) {
  return prisma.board.findFirst({
    where: {
      id: boardId,
      isActive: true,
    },
  });
}

/**
 * 게시물과 이전, 다음 아이템을 같이 불러오는 함수
 * @param boardType
 * @param boardId
 * @returns
 */
async function getBoardItemWithPrevNext(boardType: string, boardId: number) {
  const item = await prisma.board.findFirst({
    where: {
      boardType,
      id: boardId,
      isActive: true,
    },
  });

  if (!item) return null;

  const nextItem = await prisma.board.findFirst({
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    where: {
      boardType,
      id: {
        gt: boardId,
      },
      isActive: true,
    },
    take: 1,
  });

  const prevItem = await prisma.board.findFirst({
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    where: {
      boardType,
      id: {
        lt: boardId,
      },
      isActive: true,
    },
    orderBy: {
      id: "desc",
    },
    take: 1,
  });

  return {
    item,
    nextItem,
    prevItem,
  };
}

export type BoardListItem = Pick<
  Board,
  | "id"
  | "title"
  | "createdAt"
  | "viewCount"
  | "createdBy"
  | "files"
  | "images"
  | "boardType"
>;
export async function getBoardItems({
  page,
  boardType,
  keyword,
  searchType,
}: {
  page: number;
  boardType?: BoardTypeValue;
  searchType?: string;
  keyword?: string;
}) {
  const unit = 10;

  let searchCriteria = {};
  if (boardType) {
    searchCriteria = { boardType: boardType.code };
  }

  if (searchType && keyword) {
    switch (searchType) {
      case "title":
        searchCriteria = {
          ...searchCriteria,
          title: { contains: keyword },
        };
        break;
      case "content":
        searchCriteria = {
          ...searchCriteria,
          content: { contains: keyword },
        };
        break;
      case "all":
        searchCriteria = {
          ...searchCriteria,
          OR: [
            { title: { contains: keyword } },
            { content: { contains: keyword } },
          ],
        };
    }
  }

  const boardItems = await prisma.board.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      viewCount: true,
      createdBy: true,
      files: true,
      images: true,
      boardType: true,
    },
    where: {
      ...searchCriteria,
      isActive: true,
    },
    skip: (page - 1) * unit,
    take: unit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalItemCount = await prisma.board.count({
    where: {
      ...searchCriteria,
      isActive: true,
    },
  });

  return {
    items: boardItems,
    totalItemCount,
    totalPage: Math.floor(totalItemCount / unit) + 1,
  };
}

export async function updateViewCount(id: number) {
  await prisma.board.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });
}

export type SearchBoard = Pick<
  Board,
  "id" | "boardType" | "title" | "content" | "createdAt"
>;
export async function searchBoardItems(keyword: string) {
  const allBoardTypes = BoardTypes.map((type) => type.code);

  const boardMap = new Map<string /* boardType */, SearchBoard[]>();
  let totalItemCount = 0;
  for (let i = 0; i < allBoardTypes.length; i++) {
    const boardType = allBoardTypes[i];
    const boardItems = await prisma.board.findMany({
      where: {
        AND: [
          { isActive: true },
          { boardType },
          {
            OR: [
              { title: { contains: keyword } },
              { content: { contains: keyword } },
            ],
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        boardType: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    totalItemCount += boardItems.length;
    boardMap.set(boardType, boardItems);
  }

  return { totalItemCount, boardMap };
}

async function deleteOne(boardId: number) {
  // soft delete
  return prisma.board.update({
    data: {
      isActive: false,
    },
    where: {
      id: boardId,
    },
  });
}

const BoardDB = {
  deleteOne,
  getMainBoard,
  getBoardItemWithPrevNext,
};

export default BoardDB;

import { CreatedMaintenanceBoardSchema } from "@/app/(admin)/admin/(feature)/maintenance/create/schema";
import {
  Prisma,
  type AdminMaintenanceBoard as AdminMaintenanceBoardDB,
} from "@prisma/client";
import { z } from "zod";
import { prisma } from "./prisma.client";

/**
 * 게시물을 불러올 때 페이징 별 몇개의 아이템을 불러올지 단위
 */
const BOARD_PAGING_UNIT = 10;

export type AdminMaintenanceBoardListItem = Pick<
  AdminMaintenanceBoardDB,
  "id" | "title" | "createdAt" | "files" | "images"
> & {
  createdUser: {
    id: number;
    name: string;
  };
  _count: {
    replies: number;
  };
};

export async function findAll({
  page,
  keyword,
  searchType,
}: {
  page: number;
  searchType?: string;
  keyword?: string;
}) {
  let searchCriteria: Record<string, unknown> = {
    isActive: true,
  };

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

  const boardItems = await prisma.adminMaintenanceBoard.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      files: true,
      images: true,
      createdUser: {
        select: {
          name: true,
          id: true,
        },
      },
      _count: { select: { replies: true } },
    },
    where: {
      ...searchCriteria,
      isActive: true,
    },
    skip: (page - 1) * BOARD_PAGING_UNIT,
    take: BOARD_PAGING_UNIT,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalItemCount = await prisma.adminMaintenanceBoard.count({
    where: {
      ...searchCriteria,
      isActive: true,
    },
  });

  return {
    items: boardItems,
    totalItemCount,
    totalPage: Math.floor(totalItemCount / BOARD_PAGING_UNIT) + 1,
  };
}

async function findByIdAndActive(boardId: number) {
  return prisma.adminMaintenanceBoard.findUnique({
    where: {
      id: boardId,
      isActive: true,
    },

    include: {
      createdUser: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

async function create({
  content,
  title,
  createdUserId,
  fileUploadResults,
  imageFileUploadResults,
}: z.infer<typeof CreatedMaintenanceBoardSchema> & {
  createdUserId: number;
  fileUploadResults?: any;
  imageFileUploadResults?: any;
}) {
  return prisma.adminMaintenanceBoard.create({
    data: {
      title,
      content,
      createdUserId,
      ...(fileUploadResults.length > 0 && { files: fileUploadResults }),
      ...(imageFileUploadResults.length > 0 && {
        images: imageFileUploadResults,
      }),
    },
  });
}

async function deleteOne(boardId: number) {
  return prisma.adminMaintenanceBoard.update({
    where: {
      id: boardId,
    },
    data: {
      isActive: false,
    },
  });
}

async function update({
  boardId,
  title,
  content,
  updatedFiles,
  updatedImages,
}: {
  boardId: number;
  title: string;
  content: string;
  updatedFiles: any[];
  updatedImages: any[];
}) {
  return prisma.adminMaintenanceBoard.update({
    data: {
      title,
      content,
      files: updatedFiles.length > 0 ? updatedFiles : Prisma.JsonNull,
      images: updatedImages.length > 0 ? updatedImages : Prisma.JsonNull,
    },
    where: {
      id: boardId,
      isActive: true,
    },
  });
}

const AdminMaintenanceBoardDB = {
  findAll,
  findByIdAndActive,
  create,
  deleteOne,
  update,
};

export default AdminMaintenanceBoardDB;

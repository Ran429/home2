import { Prisma } from "@prisma/client";
import { prisma } from "./prisma.client";
import { APP_PATH_ROUTES_MANIFEST } from "next/dist/shared/lib/constants";

export type AdminMaintenanceBoardReplyType =
  Prisma.AdminMaintenanceBoardReplyGetPayload<{
    select: {
      id: true;
      boardId: true;
      content: true;
      updatedAt: true;
      createdUser: {
        select: {
          id: true;
          name: true;
        };
      };
    };
  }>;

async function findAllActiveByBoardId(
  boardId: number
): Promise<AdminMaintenanceBoardReplyType[]> {
  return prisma.adminMaintenanceBoardReply.findMany({
    select: {
      id: true,
      boardId: true,
      content: true,
      updatedAt: true,
      createdUser: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      boardId,
      isActive: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

async function findActiveById(replyId: number) {
  return prisma.adminMaintenanceBoardReply.findUnique({
    where: {
      id: replyId,
      isActive: true,
    },
  });
}

async function create({
  boardId,
  content,
  createdUserId,
}: {
  boardId: number;
  content: string;
  createdUserId: number;
}) {
  return prisma.adminMaintenanceBoardReply.create({
    data: {
      boardId,
      content,
      createdUserId,
    },
  });
}

/**
 * 해당하는 댓글을 삭제한다
 * 데이터를 지우는 것은 아니고 isActive 컬럼을 false로 업데이트한다
 * (soft delete)
 * @param replyId
 * @returns
 */
async function deleteById(replyId: number) {
  return prisma.adminMaintenanceBoardReply.update({
    where: {
      id: replyId,
    },
    data: { isActive: false },
  });
}

async function updateById(replyId: number, content: string) {
  return prisma.adminMaintenanceBoardReply.update({
    where: {
      id: replyId,
    },
    data: {
      content: content,
    },
  });
}

const AdminMaintenanceBoardReplyDB = {
  findAllActiveByBoardId,
  create,
  findActiveById,
  deleteById,
  updateById,
};

export default AdminMaintenanceBoardReplyDB;

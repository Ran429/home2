"use server";

import AuthUtil from "@/lib/auth-util";
import AdminMaintenanceBoardReplyDB from "@/server/prisma/admin-maintenance-board-reply.db";

export default async function createReplyAction({
  boardId,
  content,
}: {
  boardId: number;
  content: string;
}) {
  const loginUserId = await AuthUtil.getUserIdThrows();

  try {
    await AdminMaintenanceBoardReplyDB.create({
      boardId,
      content,
      createdUserId: Number(loginUserId),
    });
  } catch (e) {
    return { ok: false, message: "오류가 발생했습니다", error: e };
  }

  return { ok: true, message: "저장되었습니다" };
}

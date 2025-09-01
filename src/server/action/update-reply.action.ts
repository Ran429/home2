"use server";

import AuthUtil from "@/lib/auth-util";
import AdminMaintenanceBoardReplyDB from "@/server/prisma/admin-maintenance-board-reply.db";

export default async function updateReplyAction(
  replyId: number,
  content: string
) {
  const loginUserId = await AuthUtil.getUserIdThrows();

  const reply = await AdminMaintenanceBoardReplyDB.findActiveById(replyId);
  if (!reply) {
    return {
      ok: false,
      message: "댓글이 존재하지 않습니다",
    };
  }

  if (reply.createdUserId !== loginUserId) {
    return {
      ok: false,
      message: "내가 작성한 댓글만 수정할 수 있습니다",
    };
  }

  try {
    await AdminMaintenanceBoardReplyDB.updateById(replyId, content);
  } catch (e) {
    return {
      ok: false,
      message: "알 수 없는 오류가 발생했습니다",
      error: e,
    };
  }

  return {
    ok: true,
    message: "성공적으로 저장되었습니다",
  };
}

"use server";

import AuthUtil from "@/lib/auth-util";
import AdminMaintenanceBoardReplyDB from "@/server/prisma/admin-maintenance-board-reply.db";

export default async function deleteReplyAction(replyId: number) {
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
      message: "내가 작성한 댓글만 삭제할 수 있습니다",
    };
  }

  try {
    await AdminMaintenanceBoardReplyDB.deleteById(replyId);
  } catch (e) {
    return {
      ok: false,
      message: "알 수 없는 오류가 발생했습니다",
      error: e,
    };
  }

  return {
    ok: true,
    message: "성공적으로 삭제되었습니다",
  };
}

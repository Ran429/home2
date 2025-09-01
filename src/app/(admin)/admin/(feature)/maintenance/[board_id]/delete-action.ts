"use server";

import CacheUtil from "@/lib/cache-util";
import AdminMaintenanceBoardDB from "@/server/prisma/admin-maintenance-board.db";

export default async function deleteBoardAction(boardId: number) {
  await AdminMaintenanceBoardDB.deleteOne(boardId);
  CacheUtil.revalidateAdminMaintenanceBoardPages();
}

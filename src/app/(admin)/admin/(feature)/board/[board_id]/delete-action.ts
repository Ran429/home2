"use server";

import CacheUtil from "@/lib/cache-util";
import BoardDB from "@/server/prisma/board.db";

export default async function deleteBoardAction(boardId: number) {
  const deletedItem = await BoardDB.deleteOne(boardId);

  CacheUtil.revalidateBoardPages();
}

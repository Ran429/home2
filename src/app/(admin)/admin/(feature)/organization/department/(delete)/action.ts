"use server";

import CacheUtil from "@/lib/cache-util";
import DepartmentDB from "@/server/prisma/department.db";

export async function deleteDepartmentAction(departmentId: number) {
  await DepartmentDB.deleteOne(departmentId);

  CacheUtil.revalidateDepartmentPages();
}

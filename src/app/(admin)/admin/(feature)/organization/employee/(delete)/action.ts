"use server";

import CacheUtil from "@/lib/cache-util";
import EmployeeDB from "@/server/prisma/employee.db";
import { revalidatePath } from "next/cache";

export async function deleteEmployeeAction(employeeId: number) {
  await EmployeeDB.deleteOne(employeeId);

  CacheUtil.revalidateEmployeePages();
}

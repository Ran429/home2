"use server";

import CacheUtil from "@/lib/cache-util";
import DepartmentDB from "@/server/prisma/department.db";
import { redirect } from "next/navigation";
import { CreateDepartmentSchema } from "./schema";

export async function createDepartmentAction(
  prevState: any,
  formData: FormData
) {
  const validatedFields = CreateDepartmentSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten(),
      message: "잘못 입력된 항목이 있습니다 다시 확인해주세요",
    };
  }

  await DepartmentDB.create(validatedFields.data);
  CacheUtil.revalidateDepartmentPages();
  redirect("/admin/organization/department");
}

"use server";

import CacheUtil from "@/lib/cache-util";
import EmployeeDB from "@/server/prisma/employee.db";
import { redirect } from "next/navigation";
import { CreateEmployeeSchema } from "./schema";

export async function createEmployeeAction(prevState: any, formData: FormData) {
  const validatedFields = CreateEmployeeSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten(),
      message: "잘못 입력된 항목이 있습니다 다시 확인해주세요",
    };
  }

  await EmployeeDB.create(validatedFields.data);

  CacheUtil.revalidateEmployeePages();
  redirect("/admin/organization/employee");
}

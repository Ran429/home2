"use server";

import EmployeeDB from "@/server/prisma/employee.db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UpdateEmployeeSchema } from "./schema";
import CacheUtil from "@/lib/cache-util";

export async function updateEmployeeAction(prevState: any, formData: FormData) {
  const validatedFields = UpdateEmployeeSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten(),
      message: "잘못 입력된 항목이 있습니다 다시 확인해주세요",
    };
  }

  await EmployeeDB.update(validatedFields.data);

  CacheUtil.revalidateEmployeePages();
  redirect("/admin/organization/employee");
}

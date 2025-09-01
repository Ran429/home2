"use server";

import AssociateCompanyDB from "@/server/prisma/associate-company.db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UpdateAssociateCompanySchema } from "./schema";

export async function updateAssociateCompanyAction(
  prevState: any,
  formData: FormData
) {
  const validatedFields = UpdateAssociateCompanySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten(),
      message: "잘못 입력된 항목이 있습니다 다시 확인해주세요",
    };
  }

  await AssociateCompanyDB.update(validatedFields.data);

  revalidatePath("/admin/associate-company");
  revalidatePath("/");
  redirect("/admin/associate-company");
}

"use server";

import AssociateCompanyDB from "@/server/prisma/associate-company.db";
import { revalidatePath } from "next/cache";

export async function deleteAssociateCompanyAction(entityId: number) {
  await AssociateCompanyDB.deleteOne(entityId);
  revalidatePath("/admin/associate-company");
  revalidatePath("/");
}

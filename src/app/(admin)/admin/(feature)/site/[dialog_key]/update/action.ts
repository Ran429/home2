"use server";

import { updateConfigValue } from "@/server/prisma/config.db";
import { revalidatePath } from "next/cache";

export async function updateConfigValueAction(key: string, value: string) {
  await updateConfigValue(key, value);

  revalidatePath("/admin/site");
  revalidatePath("/", "layout"); // layout -> footer를 초기화 해야함
}

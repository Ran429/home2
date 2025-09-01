"use server";

import AuthUtil from "@/lib/auth-util";
import CacheUtil from "@/lib/cache-util";
import AdminMaintenanceBoardDB from "@/server/prisma/admin-maintenance-board.db";
import { CreatedMaintenanceBoardSchema } from "./schema";
import { UploadFileResult } from "@/@types/upload-file";

export default async function createMaintenanceBoardAction(
  formData: FormData,
  fileUploadResults: UploadFileResult[],
  imageFileUploadResults: UploadFileResult[]
) {
  const loginUserId = await AuthUtil.getUserIdThrows();

  const validatedParam = CreatedMaintenanceBoardSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedParam.success) {
    return {
      ok: false,
      message: "오류가 발생했습니다",
      paramError: validatedParam.error.flatten(),
    };
  }

  const { content, title } = validatedParam.data;

  try {
    await AdminMaintenanceBoardDB.create({
      content,
      title,
      createdUserId: Number(loginUserId),
      fileUploadResults,
      imageFileUploadResults,
    });

    CacheUtil.revalidateAdminMaintenanceBoardPages();

    return {
      ok: true,
      message: "성공적으로 저장되었습니다",
    };
  } catch (e) {
    return {
      ok: false,
      message: "오류가 발생했습니다",
      error: e,
    };
  }
}

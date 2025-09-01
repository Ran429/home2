"use server";

import { UploadFile, UploadFileResult } from "@/@types/upload-file";
import CacheUtil from "@/lib/cache-util";
import AdminMaintenanceBoardDB from "@/server/prisma/admin-maintenance-board.db";
import { UpdateBoardSchema } from "./schema";

export default async function updateMaintenanceBoardAction(
  formData: FormData,
  fileUploadResults: UploadFileResult[],
  imageFileUploadResults: UploadFileResult[]
) {
  const validatedParam = UpdateBoardSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedParam.success) {
    return {
      ok: false,
      message: "오류가 발생했습니다",
      paramError: validatedParam.error.flatten(),
    };
  }

  const boardItem = await AdminMaintenanceBoardDB.findByIdAndActive(
    validatedParam.data.board_id
  );
  if (!boardItem) {
    return {
      ok: false,
      message: "수정할 게시물이 존재하지 않습니다",
    };
  }

  const { board_id, content, title, delete_files, delete_imageFiles } =
    validatedParam.data;
  const deleteFileKeys = delete_files?.split(",") ?? [];
  const filteredFiles = ((boardItem.files ?? []) as UploadFile[]).filter(
    (it) => !deleteFileKeys.includes(it.id)
  );
  const deleteImageFileKeys = delete_imageFiles?.split(",") ?? [];
  const filteredImages = ((boardItem.images ?? []) as UploadFile[]).filter(
    (it) => !deleteImageFileKeys.includes(it.id)
  );

  const updatedFiles = [...filteredFiles, ...fileUploadResults];
  const updatedImages = [...filteredImages, ...imageFileUploadResults];
  await AdminMaintenanceBoardDB.update({
    boardId: board_id,
    content,
    title,
    updatedFiles,
    updatedImages,
  });

  CacheUtil.revalidateAdminMaintenanceBoardPages();

  return {
    ok: true,
    message: "성공적으로 저장되었습니다",
  };
}

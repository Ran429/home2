"use server";

import { UploadFile, UploadFileResult } from "@/@types/upload-file";
import CacheUtil from "@/lib/cache-util";
import { getBoardItem } from "@/server/prisma/board.db";
import { prisma } from "@/server/prisma/prisma.client";
import { Prisma } from "@prisma/client";
import { UpdateBoardSchema } from "./schema";

export default async function updateBoardAction(
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

  const boardItem = await getBoardItem(validatedParam.data.board_id);
  if (!boardItem) {
    return {
      ok: false,
      message: "수정할 게시물이 존재하지 않습니다",
    };
  }

  const { board_id, board_type, content, created_by, title, delete_files } =
    validatedParam.data;
  const deleteFileKeys = delete_files?.split(",") ?? [];
  const filteredFiles = ((boardItem.files ?? []) as UploadFile[]).filter(
    (it) => !deleteFileKeys.includes(it.id)
  );
  const filteredImages = ((boardItem.images ?? []) as UploadFile[]).filter(
    (it) => !deleteFileKeys.includes(it.id)
  );

  const updatedFiles = [...filteredFiles, ...fileUploadResults];
  const updatedImages = [...filteredImages, ...imageFileUploadResults];

  try {
    await prisma.board.update({
      data: {
        title,
        content,
        createdBy: created_by,
        boardType: board_type,
        files: updatedFiles.length > 0 ? updatedFiles : Prisma.JsonNull,
        images: updatedImages.length > 0 ? updatedImages : Prisma.JsonNull,
      },
      where: {
        id: board_id,
      },
    });

    CacheUtil.revalidateBoardPages();

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

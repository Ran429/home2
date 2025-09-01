"use server";

import { UploadFileResult } from "@/@types/upload-file";
import CacheUtil from "@/lib/cache-util";
import { prisma } from "@/server/prisma/prisma.client";
import { CreateBoardSchema } from "./schema";

export default async function createBoardAction(
  formData: FormData,
  fileUploadResults: UploadFileResult[],
  imageFileUploadResults: UploadFileResult[]
) {
  const validatedParam = CreateBoardSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedParam.success) {
    return {
      ok: false,
      message: "오류가 발생했습니다",
      paramError: validatedParam.error.flatten(),
    };
  }

  const { board_type, content, created_by, title } = validatedParam.data;

  try {
    await prisma.board.create({
      data: {
        title,
        content,
        createdBy: created_by,
        boardType: board_type,
        ...(fileUploadResults.length > 0 && { files: fileUploadResults }),
        ...(imageFileUploadResults.length > 0 && {
          images: imageFileUploadResults,
        }),
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

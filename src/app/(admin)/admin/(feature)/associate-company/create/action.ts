"use server";

import ServerFileUtil from "@/lib/server-file-util";
import AssociateCompanyDB from "@/server/prisma/associate-company.db";
import { revalidatePath } from "next/cache";
import { CreateAssociateCompanySchema } from "./schema";

export async function createAssociateCompanyAction(formData: FormData) {
  const validatedParam = CreateAssociateCompanySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedParam.success) {
    return {
      ok: false,
      message: "오류가 발생했습니다",
      error: validatedParam.error.flatten(),
    };
  }

  const imageFiles = formData.getAll("imageFiles");
  const imageFileNames = formData.getAll("imageFilesNames");
  // TODO - static 폴더로 저장되도록
  const imageFileUploadResponse = await ServerFileUtil.uploadFiles(
    imageFiles as File[],
    imageFileNames as string[]
  );
  if (!imageFileUploadResponse.ok) {
    return {
      ok: false,
      message: "파일 업로드중 오류가 발생했습니다",
      error: imageFileUploadResponse.error,
    };
  }
  const imageFileUploadResults = imageFileUploadResponse.results ?? [];
  await AssociateCompanyDB.create(validatedParam.data, imageFileUploadResults);

  revalidatePath("/admin/associate-company");
  revalidatePath("/");

  return {
    ok: true,
    message: "성공적으로 저장되었습니다",
  };
}

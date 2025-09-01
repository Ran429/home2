import { UploadFileResult } from "@/@types/upload-file";
import StorageClient from "@/server/supabase/bucket.client";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

function makeUploadedFileName(fileName: string) {
  const date = dayjs().format("YYYY_MM_DD");
  const uuid = randomUUID();

  const lastIndex = fileName.lastIndexOf(".");
  const extension = fileName.substring(lastIndex + 1);

  return date + "/" + uuid + "." + extension;
}

/**
 * 폼 데이터에 있는 파일을
 * 수파베이스 버킷에 업로드하고
 * 결과를 반환한다.
 *
 * 결과에는 id, fullPath, path, fileName, fileSize, fileType 등이 포함된다.
 * @param files
 * @param fileNames
 * @returns
 */
async function uploadFiles(
  files: File[],
  fileNames: string[]
): Promise<
  | { ok: true; results: UploadFileResult[] }
  | {
      ok: false;
      error: any; // StorageError
    }
> {
  const fileUploadResults: UploadFileResult[] = [];

  if (!files || files.length === 0) {
    return { ok: true, results: fileUploadResults };
  }

  const fileArray = Array.from(files);
  const fileNamesArray = Array.from(fileNames);

  for (let i = 0; i < fileArray.length; i++) {
    const file = fileArray[i] as File;
    const fileName = fileNamesArray[i] as string;

    const uploadedFileName = makeUploadedFileName(fileName);
    const { data, error, fileSize, fileType } = await StorageClient.uploadFile(
      uploadedFileName,
      file
    );

    if (error) {
      return { ok: false, error };
    } else {
      fileUploadResults.push({
        id: data?.id!,
        fullPath: data?.fullPath!,
        path: data?.path!,
        fileName: fileName,
        fileSize,
        fileType,
      });
    }
  }

  return { ok: true, results: fileUploadResults };
}

/**
 * @deprecated : vercel 서버에서 4.5MB 까지만 전송이 가능함.
 * 클라이언트 사이드에서 업로드 처리하도록 변경
 */
const ServerFileUtil = {
  uploadFiles,
};

export default ServerFileUtil;

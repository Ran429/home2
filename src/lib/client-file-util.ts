import { UploadFile, UploadFileResult } from "@/@types/upload-file";
import StorageClient from "@/server/supabase/bucket.client";
import dayjs from "dayjs";

const BASE_URL =
  "https://qysvdqbzumbcrawbvzzj.supabase.co/storage/v1/object/public/";

const FILE_UNIT = ["Byte", "KB", "MB", "GB", "TB"];
export function convertBytes(bytes: number) {
  let quotes = bytes;
  let remain = 0;
  let index = 0;
  const unit = 1024;

  while (true) {
    if (quotes > unit) {
      quotes = Math.floor(quotes / unit);
      remain = quotes % unit;
      index++;
    } else {
      return [quotes, remain, FILE_UNIT[index]];
    }
  }
}

export function getStaticFileUrl(path: string) {
  return BASE_URL + "klea_static/" + path;
}

/**
 * 버킷에 업로드된 파일의 실제 경로를 반환한다
 * @param uploadFile
 * @returns
 */
export function getUploadFileUrl(uploadFile: UploadFile) {
  return BASE_URL + uploadFile.fullPath;
}

function makeUploadedFileName(fileName: string) {
  const date = dayjs().format("YYYY_MM_DD");
  const uuid = self.crypto.randomUUID();

  const lastIndex = fileName.lastIndexOf(".");
  const extension = fileName.substring(lastIndex + 1);

  return date + "/" + uuid + "." + extension;
}

async function uploadStaticFile(
  file: File,
  staticFileName: string
): Promise<
  | { ok: true; results: UploadFileResult }
  | {
      ok: false;
      error: any; // StorageError
    }
> {
  if (!file || !staticFileName) {
    return { ok: false, error: "파일이 없습니다" };
  }

  const { data, error, fileSize, fileType } =
    await StorageClient.uploadStaticFile(staticFileName, file);

  if (error) {
    return { ok: false, error };
  } else {
    return {
      ok: true,
      results: {
        id: data?.id!,
        fullPath: data?.fullPath!,
        path: data?.path!,
        fileName: staticFileName,
        fileSize,
        fileType,
      },
    };
  }
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

const ClientFileUtil = {
  uploadFiles,
  uploadStaticFile,
  getStaticFileUrl,
};

export default ClientFileUtil;

/**
 * DB에 저장되어있는 업로드 파일 타입
 */
export type UploadFile = {
  id: string; // uuid
  path: string; // supabase uploaded path
  fullPath: string; // supabse full path
  fileName: string; // original file name
  fileSize: number; // original file size
  fileType: string; // file size (bytes)
};

/**
 * 수파베이스에 업로드한 결과 타입
 */
export type UploadFileResult = {
  id: string;
  fullPath: string;
  path: string;
  fileName: string;
  fileSize: number;
  fileType: string;
};

import supabaseClient, {
  STATIC_BUCKET_NAME,
  UPLOAD_BUCKET_NAME,
} from "./supabase.client";

async function uploadStaticFile(uploadedName: string, file: File) {
  const { data, error } = await supabaseClient.storage
    .from(STATIC_BUCKET_NAME)
    .upload(uploadedName, file, {
      cacheControl: "3600",
      upsert: true,
    });
  file.type;

  return {
    data,
    error,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  };
}

async function uploadFile(uploadedName: string, file: File) {
  const { data, error } = await supabaseClient.storage
    .from(UPLOAD_BUCKET_NAME)
    .upload(uploadedName, file, {
      cacheControl: "3600",
      upsert: false,
    });
  file.type;

  return {
    data,
    error,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  };
}

const StorageClient = {
  uploadStaticFile,
  uploadFile,
};

export default StorageClient;

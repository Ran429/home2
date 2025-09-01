"use server";

import { UploadFile } from "@/@types/upload-file";
import supabaseClient, {
  UPLOAD_BUCKET_NAME,
} from "../supabase/supabase.client";

export default async function downloadBoardFileAction(file: UploadFile) {
  const { data } = supabaseClient.storage
    .from(UPLOAD_BUCKET_NAME)
    .getPublicUrl(file.path);

  const publicUrl = data.publicUrl;
  const rawData = await fetch(publicUrl);
  const blob = await rawData.blob();

  return {
    type: blob.type,
    buffer: Object.values(new Uint8Array(await blob.arrayBuffer())),
  };
}

"use server";

import { UploadFile } from "@/@types/upload-file";
import AdmZip from "adm-zip";
import supabaseClient, {
  UPLOAD_BUCKET_NAME,
} from "../supabase/supabase.client";

export default async function downloadBoardFilesAction(files: UploadFile[]) {
  const zip = new AdmZip();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const { data } = supabaseClient.storage
      .from(UPLOAD_BUCKET_NAME)
      .getPublicUrl(file.path);

    const publicUrl = data.publicUrl;

    const rawData = await fetch(publicUrl);
    const arrayBuffer = await rawData.arrayBuffer();
    zip.addFile(file.fileName, Buffer.from(arrayBuffer));
  }

  const zipBuffer = await zip.toBufferPromise();

  return {
    buffer: Object.values(new Uint8Array(zipBuffer)),
  };
}

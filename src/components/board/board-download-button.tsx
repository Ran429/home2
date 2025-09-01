"use client";

import { UploadFile } from "@/@types/upload-file";
import { convertBytes } from "@/lib/client-file-util";
import { cn } from "@/lib/utils";
import downloadBoardFileAction from "@/server/action/download-board-file.action";
import Image from "next/image";

type Props = {
  file: UploadFile;
};

export default function BoardDownloadButton({ file }: Props) {
  const fileWithSizeDetail = {
    ...file,
    fileSizeDetail: convertBytes(file.fileSize),
  };

  async function handleDownload() {
    const { buffer, type } = await downloadBoardFileAction(file);
    const blob = new Blob([Uint8Array.from(buffer)], { type });
    const downloadUrl = window.URL.createObjectURL(blob);

    const linkTag = document.createElement("a");

    linkTag.href = downloadUrl;
    linkTag.download = file.fileName;
    document.body.append(linkTag);

    linkTag.click();
    document.body.removeChild(linkTag);
  }

  return (
    <button
      key={file.id}
      className="flex flex-row gap-1 items-center"
      onClick={() => handleDownload()}
    >
      <div className="relative w-[10px] h-[12px]">
        <Image
          src="/images/icons/icon_download.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="icon_download"
          className="w-full h-full"
        />
      </div>
      <span
        className={cn(
          "text-base text-normal text-klea_text_primary text-ellipsis text-nowrap overflow-hidden",
          "max-w-[160px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px]",
          "hover:underline"
        )}
      >
        {file.fileName}
      </span>
      <span className="text-base text-normal text-klea_text_primary">
        ({fileWithSizeDetail.fileSizeDetail[0]}.
        {fileWithSizeDetail.fileSizeDetail[1]}
        {fileWithSizeDetail.fileSizeDetail[2]})
      </span>
    </button>
  );
}

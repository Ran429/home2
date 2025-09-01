"use client";

import { UploadFile } from "@/@types/upload-file";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import downloadBoardFilesAction from "@/server/action/download-board-files.action";

type Props = {
  files: UploadFile[];
  fileName: string;
};

/**
 * 게시물 목록에서 사용하는 첨부파일 버튼
 * 파일을 압축하여 내려받는다
 * @param
 * @returns
 */
export default function BoardListDownloadButton({ files, fileName }: Props) {
  async function handleDownload() {
    const { buffer } = await downloadBoardFilesAction(files);
    const blob = new Blob([Uint8Array.from(buffer)], {
      type: "application/zip",
    });
    const downloadUrl = window.URL.createObjectURL(blob);
    const linkTag = document.createElement("a");
    linkTag.href = downloadUrl;
    linkTag.download = fileName;
    document.body.append(linkTag);
    linkTag.click();
    document.body.removeChild(linkTag);
  }

  return (
    <button
      onClick={handleDownload}
      className={cn(
        "text-sm font-medium lg:text-base text-[#777777]",
        "border-2 border-klea_box_border rounded-[5px]",
        "px-4 py-[0.3rem] inline-block",
        HOVER_CLASSNAME,
        "hover:border-klea_text_primary"
      )}
    >
      첨부파일
    </button>
  );
}

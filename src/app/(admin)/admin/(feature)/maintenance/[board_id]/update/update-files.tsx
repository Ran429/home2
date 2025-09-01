import { UploadFile } from "@/@types/upload-file";
import BoardDownloadButton from "@/components/board/board-download-button";
import Divider from "@/components/common/divider";
import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  files: UploadFile[] | null;
  formDataKey?: string;
};

export default function AdminUpdateBoardFiles({ files, formDataKey }: Props) {
  const [visibleFiles, setVisibleFiles] = useState<UploadFile[]>(files ?? []);
  const [deleteFileKeys, setDeletedFileKeys] = useState<string[]>([]);

  if (!files) {
    return null;
  }

  function handleClickDelete(targetFile: UploadFile) {
    setVisibleFiles(
      visibleFiles.filter((visibleFile) => visibleFile.id !== targetFile.id)
    );
    setDeletedFileKeys((prev) => [...prev, targetFile.id]);
  }

  return (
    <>
      <div className="py-5 flex flex-row gap-10 w-full">
        <input
          type="hidden"
          name={formDataKey ?? "delete_files"}
          onChange={(e) => e.target}
          value={deleteFileKeys.join(",")}
        />
        <span className="font-medium text-base">첨부파일</span>
        <div className="flex flex-col gap-2 w-full">
          {visibleFiles.map((file) => (
            <div key={file.id} className="flex flex-row gap-5">
              <BoardDownloadButton file={file} />
              <X
                className="text-red-500"
                onClick={() => handleClickDelete(file)}
              />
            </div>
          ))}
        </div>
      </div>
      <Divider className="!bg-[#E5E5E5]" />
    </>
  );
}

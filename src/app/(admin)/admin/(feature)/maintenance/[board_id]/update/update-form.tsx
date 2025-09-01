"use client";

import { UploadFile, UploadFileResult } from "@/@types/upload-file";
import AdminEditor from "@/components/admin/admin-editor";
import AdminFormButtonGroup from "@/components/admin/admin-form-button-group";
import AdminInput from "@/components/admin/admin-input";
import ClientFileUtil from "@/lib/client-file-util";
import { AdminMaintenanceBoard } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { z } from "zod";
import { UpdateBoardSchema } from "./schema";
import AdminUpdateBoardFiles from "./update-files";
import updateMaintenanceBoardAction from "./update.action";
import { Editor as TinyMCEEditor } from "tinymce";

type Props = {
  boardItem: AdminMaintenanceBoard;
};

export default function UpdateBoardForm({ boardItem }: Props) {
  const router = useRouter();

  const editorRef = useRef<TinyMCEEditor | undefined>(undefined);
  const [error, setError] = useState<{
    paramError?: z.inferFlattenedErrors<typeof UpdateBoardSchema>;
    error?: any;
    message?: string;
  } | null>();

  const filesRef = useRef<HTMLInputElement>(null);
  const imageFilesRef = useRef<HTMLInputElement>(null);

  async function handleSave(formData: FormData) {
    setError(null);

    if (!editorRef.current) return;

    const content = editorRef.current.getContent();
    if (!content || content === "") {
      alert("본문을 입력해주세요");
      return;
    }

    formData.append("content", content);

    const { error, fileUploadResults, imageFileUploadResulsts, ok } =
      await handleFile();
    if (!ok) {
      setError({ error });
      alert("파일업로드에 오류가 발생했습니다 : " + error);
      return;
    }

    const response = await updateMaintenanceBoardAction(
      formData,
      fileUploadResults,
      imageFileUploadResulsts
    );
    if (!response.ok) {
      setError({
        error: null,
        paramError: response.paramError,
        message: response.message,
      });
      alert("오류가 발생했습니다");
      return;
    }

    alert("성공적으로 저장되었습니다.");
    router.push("/admin/maintenance?page=1");
  }

  async function handleFile() {
    const files = filesRef.current?.files;
    const imageFiles = imageFilesRef.current?.files;

    let ok = true;
    let error: any = null;

    const fileUploadResults: UploadFileResult[] = [];
    const imageFileUploadResulsts: UploadFileResult[] = [];

    if (files) {
      const fileArray = Array.from(files);
      const response = await ClientFileUtil.uploadFiles(
        fileArray,
        fileArray.map((it) => it.name)
      );

      if (response.ok) {
        fileUploadResults.push(...response.results);
      } else {
        ok = false;
        error = response.error;
      }
    }

    if (imageFiles) {
      const fileArray = Array.from(imageFiles);
      const response = await ClientFileUtil.uploadFiles(
        fileArray,
        fileArray.map((it) => it.name)
      );

      if (response.ok) {
        imageFileUploadResulsts.push(...response.results);
      } else {
        ok = false;
        error = response.error;
      }
    }

    return {
      ok,
      error,
      fileUploadResults,
      imageFileUploadResulsts,
    };
  }

  return (
    <form className="w-full flex flex-col gap-10 mt-10" action={handleSave}>
      <input type="hidden" name="board_id" defaultValue={boardItem.id} />

      <AdminInput
        type="text"
        placeholder="제목을 입력하세요"
        name="title"
        topLeft="제목"
        defaultValue={boardItem.title}
        errors={error?.paramError?.fieldErrors?.title}
      />

      <AdminInput
        type="file"
        multiple
        inputRef={filesRef}
        placeholder="작성자를 입력하세요"
        topLeft="첨부파일"
      />
      <AdminUpdateBoardFiles files={boardItem.files as UploadFile[] | null} />

      <AdminInput
        type="file"
        multiple
        inputRef={imageFilesRef}
        accept="image/*"
        placeholder="작성자를 입력하세요"
        topLeft="이미지"
      />
      <AdminUpdateBoardFiles
        files={boardItem.images as UploadFile[] | null}
        formDataKey="delete_imageFiles"
      />

      <AdminEditor editorRef={editorRef} initialValue={boardItem.content} />
      {error?.paramError?.fieldErrors?.content && (
        <div className="text-sm text-red-500 font-bold">내용을 입력하세요</div>
      )}

      {error?.message && (
        <div className="text-sm text-red-500 font-bold">{error.message}</div>
      )}
      <AdminFormButtonGroup backHref={"/admin/maintenance/" + boardItem.id} />
    </form>
  );
}

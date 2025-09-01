"use client";

import { UploadFileResult } from "@/@types/upload-file";
import AdminEditor from "@/components/admin/admin-editor";
import AdminFormButtonGroup from "@/components/admin/admin-form-button-group";
import AdminInput from "@/components/admin/admin-input";
import ClientFileUtil from "@/lib/client-file-util";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
import { z } from "zod";
import createMaintenanceBoardAction from "./create.action";
import { CreatedMaintenanceBoardSchema } from "./schema";

type Props = {};

export default function CreatedMaintenanceBoardForm({}: Props) {
  const router = useRouter();

  const editorRef = useRef<TinyMCEEditor | undefined>(undefined);
  const [error, setError] = useState<{
    paramError?: z.inferFlattenedErrors<typeof CreatedMaintenanceBoardSchema>;
    error: any;
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

    const response = await createMaintenanceBoardAction(
      formData,
      fileUploadResults,
      imageFileUploadResulsts
    );
    if (!response.ok) {
      setError({ paramError: response.paramError, error: null });
      alert("오류가 발생했습니다 : " + response.message);
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
    <form
      className="w-full flex flex-col gap-10 mt-10"
      action={handleSave}
      // onSubmit={(event) => event.preventDefault()}
    >
      <AdminInput
        type="text"
        placeholder="제목을 입력하세요"
        name="title"
        topLeft="제목"
        errors={error?.paramError?.fieldErrors?.title}
      />

      <AdminInput
        type="file"
        multiple
        inputRef={filesRef}
        placeholder="작성자를 입력하세요"
        topLeft="첨부파일"
      />

      <AdminInput
        type="file"
        multiple
        inputRef={imageFilesRef}
        accept="image/*"
        placeholder="작성자를 입력하세요"
        topLeft="이미지"
      />

      <AdminEditor editorRef={editorRef} />
      {error?.paramError?.fieldErrors?.content && (
        <div className="text-sm text-red-500 font-bold">내용을 입력하세요</div>
      )}

      <AdminFormButtonGroup backHref="/admin/maintenance" />
    </form>
  );
}

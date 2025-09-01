"use client";

import { UploadFile, UploadFileResult } from "@/@types/upload-file";
import AdminEditor from "@/components/admin/admin-editor";
import AdminFormButtonGroup from "@/components/admin/admin-form-button-group";
import AdminInput from "@/components/admin/admin-input";
import SelectBox from "@/components/common/select-box";
import { BoardType, BoardTypes } from "@/constants/board-type";
import { IMAGE_EXTENSION, validateFileExtension } from "@/lib/form-util";
import ClientFileUtil from "@/lib/client-file-util";
import { Board } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
import { z } from "zod";
import { UpdateBoardSchema } from "./schema";
import AdminUpdateBoardFiles from "./update-files";
import updateBoardAction from "./update.action";

type Props = {
  adminName: string;
  boardItem: Board;
};

export default function UpdateBoardForm({ adminName, boardItem }: Props) {
  const router = useRouter();

  const editorRef = useRef<TinyMCEEditor | undefined>(undefined);
  const [boardType, setBoardType] = useState<string | undefined>(
    boardItem.boardType
  );

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

    formData.append("board_type", boardType ?? "");
    formData.append("content", content);

    // 클라이언트에서 파일 업로드 처리
    const { error, fileUploadResults, imageFileUploadResults, ok } =
      await handleFileUpload();
    if (!ok) {
      setError({ error });
      alert("파일업로드에 오류가 발생했습니다 : " + error);
      return;
    }

    // TODO: 기존 formData에 파일을 추가하던 방식에서
    // 업로드 결과를 별도 파라미터로 전달하는 방식으로 변경
    const response = await updateBoardAction(
      formData,
      fileUploadResults,
      imageFileUploadResults
    );
    if (!response.ok) {
      setError({
        error: response.error,
        paramError: response.paramError,
        message: response.message,
      });
      alert("오류가 발생했습니다 : " + response.message);
      return;
    }

    alert("성공적으로 저장되었습니다.");
    router.push("/admin/board?page=1");
  }

  // TODO: 기존 handleFile 함수를 대체하는 새로운 파일 업로드 함수
  // maintenance/update-form.tsx의 handleFile 함수 방식을 참고하여 구현
  async function handleFileUpload() {
    const files = filesRef.current?.files;
    const imageFiles = imageFilesRef.current?.files;

    let ok = true;
    let error: any = null;

    const fileUploadResults: UploadFileResult[] = [];
    const imageFileUploadResults: UploadFileResult[] = [];

    // 갤러리가 아닌 경우 일반 파일 업로드
    if (boardType !== BoardType.GALLERY.code && files) {
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

    // 갤러리인 경우 이미지 파일 업로드
    if (boardType === BoardType.GALLERY.code && imageFiles) {
      const imageFileArray = Array.from(imageFiles);

      // 이미지 확장자 검증
      if (!validateFileExtension(imageFileArray, IMAGE_EXTENSION)) {
        return {
          ok: false,
          error: "지원하는 이미지 형식이 아닙니다 다른 이미지를 선택해주세요",
          fileUploadResults: [],
          imageFileUploadResults: [],
        };
      }

      const response = await ClientFileUtil.uploadFiles(
        imageFileArray,
        imageFileArray.map((it) => it.name)
      );

      if (response.ok) {
        imageFileUploadResults.push(...response.results);
      } else {
        ok = false;
        error = response.error;
      }
    }

    return {
      ok,
      error,
      fileUploadResults,
      imageFileUploadResults,
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
        type="text"
        placeholder="작성자를 입력하세요"
        name="created_by"
        defaultValue={adminName}
        topLeft="작성자"
        errors={error?.paramError?.fieldErrors?.created_by}
      />

      <div className="flex flex-col gap-1">
        <span className="text-sm">게시판 선택</span>
        <SelectBox
          values={BoardTypes}
          onChangeValue={(value) => setBoardType(value.code)}
          defaultValue={boardItem.boardType}
        />
        {error?.paramError?.fieldErrors?.board_type && (
          <div className="text-sm text-red-500 font-bold">
            게시판 유형을 선택하세요
          </div>
        )}
      </div>

      {boardType !== BoardType.GALLERY.code && (
        <>
          <AdminInput
            type="file"
            multiple
            inputRef={filesRef}
            placeholder="작성자를 입력하세요"
            topLeft="첨부파일"
          />
          <AdminUpdateBoardFiles
            files={boardItem.files as UploadFile[] | null}
          />
        </>
      )}

      {boardType === BoardType.GALLERY.code && (
        <>
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
          />
        </>
      )}

      <AdminEditor editorRef={editorRef} initialValue={boardItem.content} />
      {error?.paramError?.fieldErrors?.content && (
        <div className="text-sm text-red-500 font-bold">내용을 입력하세요</div>
      )}

      {error?.message && (
        <div className="text-sm text-red-500 font-bold">{error.message}</div>
      )}
      <AdminFormButtonGroup backHref={"/admin/board/" + boardItem.id} />
    </form>
  );
}

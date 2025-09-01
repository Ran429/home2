"use client";

import { UploadFileResult } from "@/@types/upload-file";
import AdminFormButton from "@/components/admin/admin-form-button";
import AdminInput from "@/components/admin/admin-input";
import ClientFileUtil from "@/lib/client-file-util";
import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
/**
 * 어드민 조직도 이미지 관리 컴포넌트
 * @returns
 */
export default function AdminOrganizationImage() {
  const filesRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    if (!filesRef.current) return;

    const { error, fileUploadResults, ok } = await handleFile();
    if (!ok) {
      alert(
        `파일업로드에 오류가 발생했습니다
        [${JSON.stringify(error)}]`
      );
      return;
    }

    alert("성공적으로 저장되었습니다.");
    router.refresh();
  }

  async function handleFile() {
    const files = filesRef.current?.files;

    let ok = true;
    let error: any = null;

    let fileUploadResults: UploadFileResult | null = null;

    if (files?.length != 1) {
      ok = false;
      error = "첨부파일은 1개만 첨부해주세요";
    } else {
      const fileArray = Array.from(files);
      const response = await ClientFileUtil.uploadStaticFile(
        fileArray[0],
        "images/bg_organization.jpg"
      );

      if (response.ok) {
        fileUploadResults = response.results;
      } else {
        ok = false;
        error = response.error;
      }
    }

    return {
      ok,
      error,
      fileUploadResults,
    };
  }

  return (
    <article className="mt-10">
      <h1 className="text-3xl font-bold">조직도 이미지 관리</h1>

      <Image
        src={ClientFileUtil.getStaticFileUrl(
          "images/bg_organization.jpg?v=" + dayjs().unix()
        )}
        alt="조직도 이미지"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto max-w-[1440px] mx-auto"
        quality={100}
      />

      <form
        className="flex flex-row justify-center items-center gap-10 mt-10"
        action={handleSubmit}
      >
        <AdminInput
          type="file"
          accept="image/*"
          inputRef={filesRef}
          placeholder="작성자를 입력하세요"
          topLeft="첨부파일"
        />

        <AdminFormButton text="저장" className="max-w-[300px]" />
      </form>
    </article>
  );
}

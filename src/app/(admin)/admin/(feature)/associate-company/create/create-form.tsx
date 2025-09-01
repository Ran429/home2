"use client";

import AdminFormButtonGroup from "@/components/admin/admin-form-button-group";
import AdminInput from "@/components/admin/admin-input";
import { addFilesToFormData } from "@/lib/form-util";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { createAssociateCompanyAction } from "./action";

type Props = {};

export default function CreateAssociateCompanyForm({}: Props) {
  const [error, setError] = useState<{
    fieldErrors?: any;
    message?: string;
  }>({ fieldErrors: undefined });

  const imageFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleSave(formData: FormData) {
    setError({ fieldErrors: undefined });

    const imageFile = Array.from(imageFileRef?.current?.files ?? []);
    if (imageFile.length === 0) {
      setError((prev) => ({
        fieldErrors: {
          ...prev.fieldErrors,
          image: ["이미지 파일을 등록하지 않았습니다"],
        },
        message: "잘못 입력된 항목이 있습니다 다시 확인해주세요",
      }));
      return;
    }

    addFilesToFormData(imageFile, formData, "imageFiles");
    const response = await createAssociateCompanyAction(formData);
    if (!response.ok) {
      setError({
        fieldErrors: response.error.fieldErrors,
        message: response.message,
      });
      console.error(response.error);
      return;
    }

    alert("성공적으로 저장되었습니다");
    router.push("/admin/associate-company");
  }

  return (
    <div className="mt-10 w-full">
      <form
        className="mx-auto flex justify-center items-center w-full flex-col max-w-md gap-5"
        action={handleSave}
      >
        <AdminInput
          topLeft="이미지"
          type="file"
          name="image"
          accept="image/*"
          errors={error?.fieldErrors?.image}
          inputRef={imageFileRef}
        />

        <AdminInput
          topLeft="설명 (선택)"
          placeholder="설명을 입력해주세요"
          name="description"
          errors={error?.fieldErrors?.description}
        />
        <AdminInput
          topLeft="링크 (필수)"
          placeholder="링크를 입력해주세요"
          name="link"
          errors={error?.fieldErrors?.link}
        />
        <AdminInput
          type="number"
          topLeft="정렬순서 (필수)"
          placeholder="정렬순서를 입력해주세요"
          name="sort_order"
          errors={error?.fieldErrors?.sort_order}
        />

        <div className="mt-6 text-sm text-red-500 font-bold">
          {error?.message}
        </div>

        <AdminFormButtonGroup backHref="/admin/associate-company" />
      </form>
    </div>
  );
}

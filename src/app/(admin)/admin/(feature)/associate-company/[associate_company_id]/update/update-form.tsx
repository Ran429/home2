"use client";

import { UploadFile } from "@/@types/upload-file";
import AdminFormButtonGroup from "@/components/admin/admin-form-button-group";
import AdminInput from "@/components/admin/admin-input";
import { getUploadFileUrl } from "@/lib/client-file-util";
import { AssociateCompany } from "@prisma/client";
import Image from "next/image";
import { useFormState } from "react-dom";
import { updateAssociateCompanyAction } from "./action";
import AdminCheckBox from "@/components/admin/admin-checkbox";

type Props = {
  associateCompany: AssociateCompany;
};

export default function UpdateAssociateCompanyForm({
  associateCompany,
}: Props) {
  const [state, action] = useFormState(updateAssociateCompanyAction, null);

  return (
    <div className="mt-10 w-full">
      <form
        className="mx-auto flex justify-center items-center w-full flex-col max-w-md gap-5"
        action={action}
      >
        <input
          type="hidden"
          name="associate_company_id"
          defaultValue={associateCompany.id}
        />

        <Image
          src={getUploadFileUrl((associateCompany.image as UploadFile[])[0])}
          width={300}
          height={60}
          className="mx-auto"
          alt="associate_company"
        />

        <AdminInput
          topLeft="설명 (선택)"
          placeholder="설명을 입력해주세요"
          name="description"
          errors={state?.errors?.fieldErrors?.description}
          defaultValue={associateCompany.description ?? ""}
        />
        <AdminInput
          topLeft="링크 (필수)"
          placeholder="링크를 입력해주세요"
          name="link"
          errors={state?.errors?.fieldErrors?.link}
          defaultValue={associateCompany.link}
        />
        <AdminInput
          type="number"
          topLeft="정렬순서 (필수)"
          placeholder="정렬순서를 입력해주세요"
          name="sort_order"
          errors={state?.errors?.fieldErrors?.sort_order}
          defaultValue={associateCompany.sortOrder}
        />
        <AdminCheckBox
          text="노출여부"
          name="is_active"
          errors={state?.errors?.fieldErrors?.sort_order}
          defaultChecked={associateCompany.isActive}
        />

        <div className="mt-6 text-sm text-red-500 font-bold">
          {state?.errors && state?.message}
        </div>

        <AdminFormButtonGroup backHref="/admin/associate-company" />
      </form>
    </div>
  );
}

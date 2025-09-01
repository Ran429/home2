"use client";

import AdminFormButtonGroup from "@/components/admin/admin-form-button-group";
import AdminInput from "@/components/admin/admin-input";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";
import { createEmployeeAction } from "./action";

type Props = {};

export default function CreateEmployeeForm({}: Props) {
  const [state, action] = useFormState(createEmployeeAction, null);

  return (
    <div className="mt-10 w-full">
      <form
        className="mx-auto flex justify-center items-center w-full flex-col max-w-md gap-5"
        action={action}
      >
        <AdminInput
          topLeft="성명"
          placeholder="성명을 입력해주세요"
          name="name"
          errors={state?.errors?.fieldErrors.name}
        />
        <AdminInput
          topLeft="직책"
          placeholder="직책을 입력해주세요"
          name="responsibility"
          errors={state?.errors?.fieldErrors?.responsibility}
        />

        <div className="daisy-form-control w-full max-w-md">
          <label className="daisy-form-control">
            <div className="daisy-label">
              <span className="daisy-label-text">업무</span>
            </div>
            <textarea
              className={cn(
                "daisy-textarea daisy-textarea-bordered h-24",
                state?.errors?.fieldErrors?.works != null &&
                  state?.errors?.fieldErrors?.works?.length > 0
                  ? "border-red-500"
                  : ""
              )}
              placeholder="업무를 입력해주세요"
              name="works"
            ></textarea>
          </label>
          {state?.errors?.fieldErrors?.works && (
            <div
              id={`${"works"}-error`}
              aria-live="polite"
              className="text-sm text-red-500 font-semibold text-center mt-1"
            >
              {state?.errors?.fieldErrors?.works.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        <AdminInput
          topLeft="전화번호"
          placeholder="전화번호를 입력해주세요"
          name="phone_number"
          errors={state?.errors?.fieldErrors?.phone_number}
        />
        <AdminInput
          topLeft="부서"
          placeholder="부서를 입력해주세요"
          name="department"
          errors={state?.errors?.fieldErrors?.department}
        />

        <AdminInput
          topLeft="정렬순서"
          placeholder="정렬순서를 입력해주세요"
          name="sort_order"
          errors={state?.errors?.fieldErrors?.sort_order}
        />

        <div className="mt-6 text-sm text-red-500 font-bold">
          {state?.message}
        </div>

        <AdminFormButtonGroup backHref="/admin/organization/employee" />
      </form>
    </div>
  );
}

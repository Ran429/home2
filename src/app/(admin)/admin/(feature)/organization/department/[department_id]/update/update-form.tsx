"use client";

import AdminFormButtonGroup from "@/components/admin/admin-form-button-group";
import AdminInput from "@/components/admin/admin-input";
import { cn } from "@/lib/utils";
import { Department } from "@prisma/client";
import { useFormState } from "react-dom";
import { updateEmployeeAction } from "./action";

type Props = {
  department: Department;
};

export default function UpdateDepartmentForm({ department }: Props) {
  const [state, action] = useFormState(updateEmployeeAction, null);

  return (
    <div className="mt-10 w-full">
      <form
        className="mx-auto flex justify-center items-center w-full flex-col max-w-md gap-5"
        action={action}
      >
        <input
          type="hidden"
          name="department_id"
          defaultValue={department.id}
        />

        <AdminInput
          topLeft="부서 이름"
          placeholder="부서 이름을 입력해주세요"
          name="name"
          defaultValue={department.name}
          errors={state?.errors?.fieldErrors.name}
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
              defaultValue={department.works}
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
          topLeft="정렬순서"
          placeholder="정렬순서를 입력해주세요"
          name="sort_order"
          defaultValue={department.sortOrder}
          errors={state?.errors?.fieldErrors?.sort_order}
        />

        <div className="mt-6 text-sm text-red-500 font-bold">
          {state?.message}
        </div>

        <AdminFormButtonGroup backHref="/admin/organization/department" />
      </form>
    </div>
  );
}

"use client";

import AdminFormButton from "@/components/admin/admin-form-button";
import AdminInput from "@/components/admin/admin-input";
import { useFormState } from "react-dom";
import { authenticate } from "./action";
import { LOGIN_CODE } from "./schema";

export default function LoginPage() {
  const [state, action] = useFormState(authenticate, null);

  return (
    <>
      <form
        action={action}
        className="flex justify-center items-center flex-col w-full max-w-md"
      >
        <AdminInput
          topLeft="아이디"
          placeholder="아이디를 입력해주세요"
          name="userId"
          errors={state?.errors?.fieldErrors?.userId}
        />
        <AdminInput
          type="password"
          topLeft="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          name="password"
          errors={state?.errors?.fieldErrors?.password}
        />
        <AdminFormButton
          text={"로그인"}
          loadingText="잠시만 기다려주세요"
          className="mt-5"
        />
      </form>

      <div className="flex h-8 items-end space-x-1">
        {state?.code !== LOGIN_CODE.SUCCESS && (
          <p aria-live="polite" className="text-sm text-red-500 font-semibold">
            {state?.code === LOGIN_CODE.CredentialsSignin &&
              "아이디와 비밀번호를 다시 확인해주세요"}

            {state?.code === LOGIN_CODE.CallbackRouteError &&
              "아이디와 비밀번호를 다시 확인해주세요"}

            {state?.code === LOGIN_CODE.PARAM_ERROR &&
              "입력한 정보에 오류가있습니다."}

            {state?.code !== LOGIN_CODE.CallbackRouteError &&
              state?.code !== LOGIN_CODE.CredentialsSignin &&
              state?.code !== LOGIN_CODE.PARAM_ERROR &&
              state?.code}
          </p>
        )}
      </div>
    </>
  );
}

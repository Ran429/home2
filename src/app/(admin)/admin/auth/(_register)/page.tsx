"use client";

import AdminFormButton from "@/components/admin/admin-form-button";
import AdminInput from "@/components/admin/admin-input";
import { ChangeEventHandler, useState } from "react";
import { useFormState } from "react-dom";
import { registerUser } from "./action";

export default function RegisterPage() {
  const [state, action] = useFormState(registerUser, null);
  const [name, setName] = useState<string>("");

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    const replaced = e.target.value.replaceAll(
      /[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/ ]/g,
      ""
    );
    setName(replaced);
  };

  return (
    <>
      <form
        className="flex justify-center items-center w-full flex-col max-w-md"
        action={action}
      >
        <AdminInput
          topLeft="아이디"
          topRight="* 아이디는 특수문자를 입력할 수 없습니다."
          topRightClass="text-red-500"
          placeholder="아이디를 입력해주세요"
          name="userId"
          errors={state?.errors?.fieldErrors.name}
          onChange={handleChangeName}
          value={name}
        />

        <AdminInput
          type="password"
          topLeft="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          name="password"
          errors={state?.errors?.fieldErrors?.password}
        />
        <AdminInput
          type="password"
          topLeft="비밀번호 확인"
          placeholder="비밀번호 확인을 입력해주세요"
          name="passwordConfirm"
          errors={state?.errors?.fieldErrors?.passwordConfirm}
        />
        <AdminInput
          topLeft="이름"
          placeholder="이름을 입력해주세요"
          name="name"
          errors={state?.errors?.fieldErrors?.name}
        />
        <AdminFormButton
          text={"회원가입"}
          loadingText="잠시만 기다려주세요..."
          className="mt-5"
        />

        <div className="mt-6 text-sm text-red-500 font-bold">
          {state?.message}
        </div>
      </form>
    </>
  );
}

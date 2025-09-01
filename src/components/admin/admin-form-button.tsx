"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

type FormButtonProps = {
  text: string;
  loadingText?: string;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function AdminFormButton({
  text,
  loadingText = "잠시만 기다려주세요...",
  disabled,
  className,
  ...rest
}: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        "daisy-btn daisy-btn-primary w-full max-w-md",
        className ?? ""
      )}
      aria-disabled={disabled || pending}
      disabled={disabled || pending}
      {...rest}
    >
      {pending ? (
        <>
          <span className="daisy-loading daisy-loading-spinner"></span>
          {loadingText ?? text}
        </>
      ) : (
        text
      )}
    </button>
  );
}

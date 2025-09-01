"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useFormStatus } from "react-dom";

type Props = {
  backHref: string;
};

export default function AdminFormButtonGroup({ backHref }: Props) {
  const { pending } = useFormStatus();

  return (
    <div className="mt-10 w-full flex justify-center items-center gap-5">
      <Link
        className={cn(
          "daisy-btn daisy-btn-outline daisy-btn-lg",
          pending ? "daisy-btn-disabled" : ""
        )}
        href={backHref}
      >
        {pending ? (
          <span className="loading loading-spinner loading-sm">
            저장 중 입니다...
          </span>
        ) : (
          "뒤로"
        )}
      </Link>

      <button
        className={cn(
          "daisy-btn daisy-btn-primary daisy-btn-lg",
          pending ? "daisy-btn-disabled" : ""
        )}
        type="submit"
      >
        {pending ? (
          <span className="loading loading-spinner loading-sm">
            저장 중 입니다...
          </span>
        ) : (
          "저장"
        )}
      </button>
    </div>
  );
}

"use client";

import { HOVER_EMPHASIZE } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function AdminActivitiesSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  function onClickSearch() {
    const keyword = inputRef.current?.value;
    if (!keyword) {
      alert("검색어를 입력해주세요");
      inputRef?.current?.focus();
      return;
    }

    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set("page", "1");
    urlSearchParams.set("keyword", keyword);
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }

  return (
    <div
      className={cn(
        "mt-10 bg-[#F7F8FB] w-full rounded-[20px] py-10 px-4",
        "flex flex-col justify-center items-center gap-[9px]",
        "pc lg:flex-row"
      )}
    >
      <div className="w-full lg:max-w-[600px] flex flex-row gap-[9px]">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="text-base w-full bg-white rounded-md border border-[#DDDDDD] px-3 py-3 placeholder:text-base"
          ref={inputRef}
          defaultValue={searchParams.get("keyword") ?? ""}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClickSearch();
            }
          }}
        />
        <button
          className={cn(
            "font-bold text-base px-8 py-3 text-white bg-hvri_primary rounded-md",
            HOVER_EMPHASIZE
          )}
          onClick={onClickSearch}
        >
          검색
        </button>
      </div>
    </div>
  );
}
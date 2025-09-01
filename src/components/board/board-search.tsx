"use client";

import SelectBox from "@/components/common/select-box";
import { BoardSearchTypes } from "@/constants/board-search-type";
import { HOVER_EMPHASIZE } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function BoardSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchType, setSearchType] = useState<string | undefined>(
    searchParams.get("search_type") ?? "title"
  );
  const [openSelect, setOpenSelect] = useState<boolean>(false);

  function onChangeSearchType(value: { code: string; text: string }) {
    setSearchType(value.code);
  }

  function onClickSearch() {
    if (!searchType) {
      alert("검색 조건을 선택해주세요");
      setOpenSelect(true);
      return;
    }

    const keyword = inputRef.current?.value;
    if (!keyword) {
      alert("검색어를 입력해주세요");
      inputRef?.current?.focus();
      return;
    }

    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set("page", "1");
    urlSearchParams.set("search_type", searchType);
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
      <SelectBox
        triggerClassname="w-full lg:w-[200px]"
        popoverClassname="max-w-sm lg:w-[200px]"
        values={BoardSearchTypes}
        onChangeValue={onChangeSearchType}
        defaultValue={searchType}
        open={openSelect}
        key={openSelect.toString()}
      />

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
            "font-bold text-base px-8 py-3 text-white bg-klea_text_primary rounded-md",
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

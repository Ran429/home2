"use client";

import SelectBox from "@/components/common/select-box";
import { ActivitySearchTypes } from "@/constants/activity-search-type";
import { HOVER_EMPHASIZE } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const QUERY_KEYS = {
  SEARCH_TYPE: "search_type",
  KEYWORD: "keyword",
  PAGE: "page",
};

export default function AdminActivitiesSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [searchType, setSearchType] = useState<string>(
    searchParams.get(QUERY_KEYS.SEARCH_TYPE) ?? ActivitySearchTypes[0].code
  );
  const [openSelect, setOpenSelect] = useState<boolean>(false);

  function onChangeSearchType(value: { code: string; text: string }) {
    setSearchType(value.code);
  }

  function onClickSearch() {
    if (!searchType) {
      toast({ title: "검색 조건을 선택해주세요", variant: "destructive" });
      setOpenSelect(true);
      return;
    }

    const keyword = inputRef.current?.value?.trim();
    if (!keyword) {
      toast({ title: "검색어를 입력해주세요", variant: "destructive" });
      inputRef.current?.focus();
      return;
    }

    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set(QUERY_KEYS.PAGE, "1");
    urlSearchParams.set(QUERY_KEYS.SEARCH_TYPE, searchType);
    urlSearchParams.set(QUERY_KEYS.KEYWORD, keyword);

    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }

  return (
    <div
      className={cn(
        "mt-10 bg-hvri_background w-full rounded-[20px] py-10 px-4",
        "flex flex-col justify-center items-center gap-[9px]",
        "pc lg:flex-row"
      )}
    >
      <SelectBox
        triggerClassname="w-full lg:w-[200px]"
        popoverClassname="max-w-sm lg:w-[200px]"
        values={ActivitySearchTypes}
        onChangeValue={onChangeSearchType}
        defaultValue={searchType}
        open={openSelect}
        key={openSelect.toString()}
      />

      <div className="w-full lg:max-w-[600px] flex flex-row gap-[9px]">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="text-base w-full bg-white rounded-md border border-gray-300 px-3 py-3 placeholder:text-base"
          ref={inputRef}
          defaultValue={searchParams.get(QUERY_KEYS.KEYWORD) ?? ""}
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

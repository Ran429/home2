"use client";

import SelectBox from "@/components/common/select-box";
import { EmpoloyeeSearchTypes } from "@/constants/employee-search-type";
import { HOVER_EMPHASIZE } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

type Props = {
  currentHash?: string;
};

export default function OrganizationSearch({ currentHash }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchType, setSearchType] = useState<string | undefined>(
    searchParams.get("search_type") ?? undefined
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

    const urlSearchParams = new URLSearchParams(searchParams.toString());
    if (searchType) {
      urlSearchParams.set("search_type", searchType);
    }
    if (keyword) {
      urlSearchParams.set("keyword", keyword);
    } else {
      urlSearchParams.delete("search_type");
      urlSearchParams.delete("keyword");
    }

    let url = `${pathname}?${urlSearchParams.toString()}`;
    if (currentHash) {
      url += currentHash;
    }
    router.push(url, { scroll: false });
  }

  return (
    <div
      className={cn(
        "mt-10 bg-[#F7F8FB] w-full rounded-xl py-10 px-4",
        "flex justify-center items-center gap-[9px]",
        "pc lg:flex-row",
        "mobile flex-col"
      )}
    >
      <div className="w-full lg:w-[200px]">
        <SelectBox
          triggerClassname="w-full lg:!w-[200px]"
          popoverClassname="w-full lg:!w-[200px]"
          values={EmpoloyeeSearchTypes}
          onChangeValue={onChangeSearchType}
          defaultValue={searchType}
          emptyText="검색 조건"
          open={openSelect}
          key={openSelect.toString()}
        />
      </div>

      <div className="w-full max-w-[600px] flex flex-row gap-[9px]">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="text-base flex-1 bg-white rounded-md border border-[#DDDDDD] px-3 py-3 placeholder:text-base"
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

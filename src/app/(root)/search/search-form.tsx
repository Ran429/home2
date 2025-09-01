"use client";

import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  keyword?: string;
};

export default function SearchForm({ keyword }: Props) {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState<string>(keyword ?? "");

  function search() {
    if (searchKeyword === "") {
      alert("검색어를 입력하세요.");
      return;
    }

    router.push("/search?keyword=" + searchKeyword);
  }

  return (
    <div
      className={cn(
        "mt-8 w-full max-w-xs mx-auto relative",
        "pc lg:mt-12 lg:max-w-xl"
      )}
    >
      <input
        type="text"
        className={cn(
          "text-base bg-transparent w-full border-b-2 font-semibold px-1 border-black",
          "pc lg:text-2xl"
        )}
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            search();
          }
        }}
        // onBlur={() => setSearchKeyword("")}
      />
      <button
        className={cn("p-1 absolute right-0 -top-2 lg:-top-1", HOVER_CLASSNAME)}
      >
        <MagnifyingGlassIcon
          className="text-klea_text_primary size-6 lg:size-7"
          onClick={() => search()}
        />
      </button>
    </div>
  );
}

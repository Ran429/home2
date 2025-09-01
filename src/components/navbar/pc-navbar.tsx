"use client";

import useScrollHeight from "@/hooks/use-scroll-height";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { FONT_PRETENDARD } from "@/lib/font-util";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PcMenu from "./pc-menu";

export default function PcNavBar() {
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  const { isTop } = useScrollHeight();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const router = useRouter();

  function search() {
    if (searchKeyword === "") {
      alert("검색어를 입력하세요.");
      return;
    }

    setSearchKeyword("");
    router.push("/search?keyword=" + searchKeyword);
  }

  useEffect(() => {
    function handleOuterClickSearchInput(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target.id !== "search_input") {
        setSearchKeyword("");
      }
    }
    document.addEventListener("click", handleOuterClickSearchInput);

    return () =>
      document.removeEventListener("click", handleOuterClickSearchInput);
  });

  return (
    <nav
      className={cn(
        FONT_PRETENDARD,
        "top-0 w-full text-black z-20 fixed",
        "h-[100px] bg-white px-4",
        visibleMenu ? "bg-opacity-100" : "bg-opacity-50",
        isTop ? "backdrop-blur" : "!bg-white shadow-md"
      )}
    >
      <div className="container font-bold flex flex-row items-center justify-center h-full">
        <Link
          className={cn(
            "flex-none mr-auto flex justify-center items-center",
            "pc lg:w-[25vw] max-w-[295px] lg:h-[50%]"
          )}
          href="/"
        >
          <Image
            src="/images/logo/logo_big.png"
            alt="logo"
            width={0}
            height={0}
            sizes="25vw"
            className="w-full aspect-auto"
            priority
          />
        </Link>

        <PcMenu onChangeVisibleMenu={(visible) => setVisibleMenu(visible)} />

        <div
          className={cn(
            "ml-32 flex-row gap-3 justify-center items-center py-3 px-4 bg-white",
            "border-[#BBBBBB] border-2 rounded-[30px]",
            "pc hidden xl:flex"
          )}
        >
          <input
            id="serach_input"
            type="text"
            placeholder="검색어를 입력해주세요"
            className="pl-2 placeholder:text-[#AAAAAA] placeholder:font-bold placeholder:text-sm outline-none"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                search();
              }
            }}
          />
          <MagnifyingGlassIcon
            className={cn("size-7 cursor-pointer", HOVER_CLASSNAME)}
            onClick={() => search()}
          />
        </div>
      </div>
    </nav>
  );
}

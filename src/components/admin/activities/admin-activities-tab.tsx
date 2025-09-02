"use client";

import { BoardType, BoardTypes } from "@/constants/board-type";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  currentBoardType?: string;
  classname?: string;
};

export default function AdminActivitiesTab({ currentBoardType, classname }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleAllClick() {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set("page", "1");
    urlSearchParams.delete("board_type");

    router.push(`/admin/board?${urlSearchParams.toString()}`);
  }

  function handleTabClick(boardType: BoardType) {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set("page", "1");
    urlSearchParams.set("board_type", boardType.code);

    router.push(`/admin/board?${urlSearchParams.toString()}`);
  }

  return (
    <div className={cn("w-full relative z-10 mt-10", classname)}>
      <ul className="w-full flex flex-row gap-9 lg:gap-16">
        <li
          className={cn(
            "font-semibold lg:text-xl text-lg pb-3",
            !currentBoardType
              ? "text-hvri_primary border-hvri_primary border-b-[3px]"
              : "text-[#555555]"
          )}
        >
          <button className={HOVER_CLASSNAME} onClick={() => handleAllClick()}>
            전체
          </button>
        </li>
        {/* 정보시스템은 게시판이 아니므로 제외 */}
        {BoardTypes.filter((boardType: BoardType) => boardType.code !== "INFO").map(
          (boardType) => (
            <li
              key={boardType.code}
              className={cn(
                "font-semibold lg:text-xl text-lg pb-3",
                currentBoardType === boardType.code
                  ? "text-hvri_primary border-hvri_primary border-b-[3px]"
                  : "text-[#555555]"
              )}
            >
              <button
                className={HOVER_CLASSNAME}
                onClick={() => handleTabClick(boardType)}
              >
                {boardType.text}
              </button>
            </li>
          )
        )}
      </ul>
      <div className="absolute w-full bg-[#E5E5E5] h-[2px] bottom-0 -z-10"></div>
    </div>
  );
}
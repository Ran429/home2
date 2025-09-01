"use client";

import type { MainBoardType } from "@/@types/board-types";
import { BoardType, getBoardTypeEnum } from "@/constants/board-type";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { yyyymmdd } from "@/lib/time-util";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Fragment, useState } from "react";
import MainBoardTab from "./main-board-tab";
import MainBoardTitle from "./main-board-title";

type Props = {
  title: string;
  backgroundColor?: string;
  tabs: BoardType[];
  boardItems: Map<string, MainBoardType[]>;
};

export default function MainBoardArticle({
  title,
  backgroundColor,
  tabs,
  boardItems,
}: Props) {
  const [visibleItems, setVisibleItems] = useState<MainBoardType[]>(
    boardItems.get("ALL") ?? []
  );

  function handleChangeTab(tab: BoardType) {
    const targetItems = boardItems.get(tab.code);
    setVisibleItems(targetItems ?? []);
  }

  return (
    <article
      className={cn(
        "border-klea_box_border border py-8 flex-1 rounded-xl flex flex-col",
        "pc lg:px-9",
        "mobile px-6",
        backgroundColor ?? ""
      )}
    >
      <div
        className={cn(
          "flex items-center",
          "pc xl:flex-row xl:justify-start",
          "mobile flex-col justify-center gap-6"
        )}
      >
        <MainBoardTitle title={title} />
        <MainBoardTab tabs={tabs} onSelectTab={handleChangeTab} />
      </div>

      <ul className="mt-11">
        {visibleItems.length > 0 ? (
          visibleItems.map((board, index) => (
            <Fragment key={board.id}>
              <li className="flex flex-row justify-start items-center">
                <span
                  className={cn(
                    "rounded-3xl py-1 px-4 text-[15px] lg:text-base font-bold",
                    board.boardType === "NOTICE"
                      ? "bg-[#DEE8FF] text-[#2F5BC1]"
                      : "",
                    board.boardType === "RECRUIT"
                      ? "bg-[#E5E5E5] text-[#333333]"
                      : "",
                    board.boardType === "BIDDING"
                      ? "bg-[#FFE6A3] text-[#5F4500]"
                      : "",
                    board.boardType === "LEGAL"
                      ? "bg-white text-klea_text_primary"
                      : "",
                    board.boardType === "PRESS" ? "bg-white text-[#333333]" : ""
                  )}
                >
                  {getBoardTypeEnum(board.boardType)?.text?.substring(0, 2)}
                </span>
                <Link
                  href={`/board/${board.boardType.toLowerCase()}/${board.id}`}
                  className={cn(
                    "ml-3 text-[15px] lg:text-base flex-1 overflow-hidden whitespace-nowrap text-ellipsis",
                    "hover:underline",
                    HOVER_CLASSNAME
                  )}
                >
                  {board.title}
                </Link>
                <span className="hidden lg:inline-block ml-auto text-[#AAAAAA] text-[15px] lg:text-base font-normal">
                  {yyyymmdd(board.createdAt)}
                </span>
              </li>

              {index !== visibleItems.length - 1 && (
                <li className="h-px border-dotted border-t border-[#DDDDDD] my-5" />
              )}
            </Fragment>
          ))
        ) : (
          <li>아직 작성된 글이 없습니다.</li>
        )}
      </ul>
    </article>
  );
}

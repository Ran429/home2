"use client";

import { BoardType } from "@/constants/board-type";
import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";

type Props = {
  tabs: BoardType[];
  onSelectTab?: (tab: BoardType) => void;
};

export default function MainBoardTab({ tabs, onSelectTab }: Props) {
  const [active, setActive] = useState<BoardType>(tabs[0]);

  return (
    <ul className="flex flex-row gap-3 lg:gap-4">
      {tabs.map((tab, index) => (
        <Fragment key={tab.code}>
          <li
            className={cn(
              "font-bold text-base lg:text-[18px] container:text-xl cursor-pointer",
              active.code === tab.code
                ? `border-b-4 border-klea_text_primary`
                : "text-[#AAAAAA]"
            )}
            onClick={() => {
              setActive(tab);
              onSelectTab?.(tab);
            }}
          >
            {tab.text}
          </li>
          {index !== tabs.length - 1 && (
            <li
              key={tab.code}
              className="mt-[5px] h-[12px] lg:mt-[7px] lg:h-[15px] w-px bg-[#AAAAAA] rotate-45"
            ></li>
          )}
        </Fragment>
      ))}
    </ul>
  );
}

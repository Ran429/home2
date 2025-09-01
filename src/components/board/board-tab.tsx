import { BoardType, getCommonBoardTypes } from "@/constants/board-type";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  boardType: BoardType;
  classname?: string;
};

export default function BoardTab({ boardType, classname }: Props) {
  return (
    <div className={cn("w-full relative z-10", classname)}>
      <ul className="w-full flex flex-row gap-9 lg:gap-16">
        {getCommonBoardTypes(boardType).map((it) => (
          <li
            key={it.code}
            className={cn(
              "font-semibold lg:text-xl text-lg pb-3",
              it.code === boardType.code
                ? "text-klea_text_primary border-klea_text_primary border-b-[3px]"
                : "text-[#555555]"
            )}
          >
            <Link href={it.href} className={HOVER_CLASSNAME}>
              {it.text}
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute w-full bg-[#E5E5E5] h-[2px] bottom-0 -z-10"></div>
    </div>
  );
}

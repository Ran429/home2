"use client";

import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { FONT_PRETENDARD } from "@/lib/font-util";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MobileMenu from "./mobile-menu";
import useScrollHeight from "@/hooks/use-scroll-height";

type Props = {
  title: string;
};

export default function MobileDetailPageNavBar({ title }: Props) {
  const router = useRouter();
  const { isTop } = useScrollHeight();

  return (
    <nav
      className={cn(
        "top-0 w-full text-black z-20 fixed border-b shadow-lg",
        "h-[80px] pl-[10px] pr-5",
        isTop ? "bg-white/50 backdrop-blur" : "bg-white",
        FONT_PRETENDARD.className
      )}
    >
      <div className="container font-bold flex flex-row items-center justify-center h-full">
        <button
          className={cn("px-5 py-4 relative size-14", HOVER_CLASSNAME)}
          onClick={() => router.back()}
        >
          <Image
            src="/images/icons/icon_left_arrow.png"
            alt="icon_left_arrow"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full"
          />
        </button>
        <span className="mr-auto text-xl font-bold">{title}</span>

        {/* 
        <button className="ml-2 border-[#BBBBBB] border-2 rounded-2xl p-2 cursor-pointer">
          <MagnifyingGlassIcon className="size-8" />
        </button> */}
        <MobileMenu />
      </div>
    </nav>
  );
}

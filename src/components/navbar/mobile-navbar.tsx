"use client";

import useScrollHeight from "@/hooks/use-scroll-height";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { FONT_PRETENDARD } from "@/lib/font-util";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

export default function MobileNavBar() {
  const { isTop } = useScrollHeight();

  return (
    <nav
      className={cn(
        FONT_PRETENDARD.className,
        "top-0 w-full text-black z-20 fixed shadow-lg h-[80px] px-5",
        isTop ? "bg-white/50 backdrop-blur" : "bg-white"
      )}
    >
      <div className="font-bold flex items-center h-full">
        <Link
          className={cn(
            "flex-none mr-auto flex justify-center items-center",
            HOVER_CLASSNAME
          )}
          href="/"
        >
          <Image
            src="/images/logo/logo_mobile.png"
            alt="logo"
            width={136}
            height={44}
            priority
          />
        </Link>

        <MobileMenu />
      </div>
    </nav>
  );
}

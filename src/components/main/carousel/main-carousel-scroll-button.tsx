"use client";

import useWindowSize from "@/hooks/use-window-size";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function MainCarouselScrollButton() {
  const { height } = useWindowSize();

  /**
   * 뷰포트 크기만큼 부드럽게 스크롤한다
   */
  function handleScroll() {
    if (!height) return;

    window.scrollTo({ top: height - 100, behavior: "smooth" });
  }

  return (
    <button
      className={cn(
        "absolute bottom-px md:bottom-0 left-[calc(50%-40px)]",
        HOVER_CLASSNAME
      )}
      onClick={handleScroll}
    >
      <Image
        src="/images/icons/icon_scroll.png"
        height={200}
        width={80}
        alt="btn_scroll"
      />
    </button>
  );
}

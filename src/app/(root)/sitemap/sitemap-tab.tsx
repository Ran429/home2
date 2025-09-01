"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { FIRST_MENU } from "@/constants/menu";
import useHash from "@/hooks/use-hash";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  classname?: string;
};

export default function SitemapTab({ classname }: Props) {
  const hash = useHash();
  const currentTabIndex = FIRST_MENU.findIndex((tab) => tab.hash === hash);

  return (
    <div className={cn("w-full relative z-10", classname)}>
      <Carousel
        className="w-full"
        opts={{
          startIndex: currentTabIndex !== -1 ? currentTabIndex : 0,
        }}
      >
        <CarouselContent className="gap-9 lg:gap-16">
          {FIRST_MENU.map((menu) => (
            <CarouselItem
              key={menu.text}
              className={cn(
                "basis-auto font-semibold lg:text-xl text-lg pb-3",
                hash === menu.hash
                  ? "text-klea_text_primary border-klea_text_primary border-b-[3px]"
                  : "text-[#555555]"
              )}
            >
              <Link href={menu.hash} className={cn(HOVER_CLASSNAME)}>
                {menu.text}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute w-full bg-[#E5E5E5] h-[2px] bottom-0 -z-10"></div>
    </div>
  );
}

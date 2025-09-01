"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { IntroduceType, IntroduceTypes } from "@/constants/introduce-type";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  introduceType: IntroduceType;
  classname?: string;
};

export default function IntroduceTab({ introduceType, classname }: Props) {
  const tabs = IntroduceTypes;
  const currentTabIndex = tabs.findIndex(
    (tab) => tab.title === introduceType.title
  );

  return (
    <div className={cn("w-full relative z-10", classname)}>
      <Carousel
        className="w-full"
        opts={{
          startIndex: currentTabIndex !== -1 ? currentTabIndex : 0,
        }}
      >
        <CarouselContent className="gap-9 lg:gap-16">
          {IntroduceTypes.map((tab) => (
            <CarouselItem
              key={tab.title}
              className={cn(
                "basis-auto font-semibold lg:text-xl text-lg pb-3",
                tab.href === introduceType.href
                  ? "text-klea_text_primary border-klea_text_primary border-b-[3px]"
                  : "text-[#555555]"
              )}
            >
              <Link href={tab.href} className={cn(HOVER_CLASSNAME)}>
                {tab.title}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute w-full bg-[#E5E5E5] h-[2px] bottom-0 -z-10"></div>
    </div>
  );
}

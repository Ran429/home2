"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BusinessType, getMainTabs } from "@/constants/business-type";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  businessType: BusinessType;
  classname?: string;
};

export default function BusinessTab({ businessType, classname }: Props) {
  const tabs = getMainTabs();
  const currentTabIndex = tabs.findIndex(
    (tab) => tab.group === businessType.group
  );

  return (
    <div className={cn("w-full px-4 contaier:px-0 relative z-10", classname)}>
      <Carousel
        className="w-full"
        opts={{
          startIndex: currentTabIndex !== -1 ? currentTabIndex : 0,
        }}
      >
        <CarouselContent className="gap-9 lg:gap-16">
          {tabs.map((tab) => (
            <CarouselItem
              key={tab.title}
              className={cn(
                "basis-auto font-semibold lg:text-xl text-lg pb-3",
                tab.group === businessType.group
                  ? "text-klea_text_primary border-klea_text_primary border-b-[3px]"
                  : "text-[#555555]"
              )}
            >
              <Link href={tab.href ?? "/"} className={cn(HOVER_CLASSNAME)}>
                {tab.mainTabTitle}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute w-full bg-[#E5E5E5] h-[2px] bottom-0 -z-10"></div>
    </div>
  );
}

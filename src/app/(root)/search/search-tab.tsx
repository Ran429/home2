"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useHash from "@/hooks/use-hash";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  classname?: string;
};

const Tabs = [
  { title: "공지사항", href: "#notice" },
  { title: "채용정보", href: "#recruit" },
  { title: "입찰공고", href: "#bidding" },
  { title: "갤러리", href: "#gallery" },
  { title: "법정자료", href: "#legal" },
  { title: "보도자료", href: "#press" },
];

export default function SearchTab({ classname }: Props) {
  const hash = useHash();

  return (
    <div className={cn("w-full relative z-0", classname)}>
      <Carousel className="w-full" opts={{ align: "center" }}>
        <CarouselContent className="gap-9 lg:gap-16">
          {Tabs.map((it) => (
            <CarouselItem
              key={it.title}
              className={cn(
                "basis-auto font-semibold lg:text-xl text-lg pb-3",
                hash === it.href
                  ? "text-klea_text_primary border-klea_text_primary border-b-[3px]"
                  : ""
              )}
            >
              <Link href={it.href} className={cn(HOVER_CLASSNAME)}>
                {it.title}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute w-full bg-[#E5E5E5] h-[2px] bottom-[0px] -z-10"></div>
    </div>
  );
}

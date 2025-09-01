"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Department } from "@prisma/client";
import Link from "next/link";

type Props = {
  departments: Department[];
  currentHash?: string;
};

/**
 * 부서 검색 탭
 * @returns
 */
export default function DeptSearchTab({ departments, currentHash }: Props) {
  return (
    <>
      <Carousel className="flex flex-row justify-center mt-8 lg:mt-16">
        <CarouselContent className="gap-3">
          <CarouselItem className="basis-auto">
            <Link
              href={"#"}
              scroll={false}
              className={cn(
                "active:bg-[#333333] active:text-white",
                "hover:bg-[#333333] hover:text-white transition-colors",
                "rounded-3xl inline-block",
                "mobile px-7 py-2 text-sm",
                "pc lg:px-7 lg:py-3 lg:text-[18px]",
                currentHash === ""
                  ? "bg-[#333333] text-white"
                  : "bg-[#F8F8F8] text-[#333333]"
              )}
            >
              전체
            </Link>
          </CarouselItem>

          {departments.map((department) => (
            <CarouselItem key={department.id} className="basis-auto">
              <Link
                href={"#" + department.id}
                scroll={false}
                className={cn(
                  "active:bg-[#333333] active:text-white",
                  "hover:bg-[#333333] hover:text-white transition-colors",
                  "rounded-3xl inline-block",
                  "mobile px-7 py-2 text-sm",
                  "pc lg:px-7 lg:py-3 lg:text-[18px]",
                  currentHash === "#" + department.id
                    ? "bg-[#333333] text-white"
                    : "bg-[#F8F8F8] text-[#333333]"
                )}
              >
                {department.name}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}

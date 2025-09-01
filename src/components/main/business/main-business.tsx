"use client";

import useWindowSize from "@/hooks/use-window-size";
import { cn } from "@/lib/utils";
import MainTitle from "../main-title";
import MobileMainBusiness from "./mobile-main-business";
import PcMainBusiness from "./pc-main-business";

export default function MainBusiness() {
  const { width } = useWindowSize();
  const isMobile = width ? width < 1280 : undefined;

  if (isMobile === undefined) return null;

  return (
    <section
      className={cn(
        "container z-10",
        "pc lg:mt-20",
        "container:px-0 px-4",
        "mobile mt-[63px] relative"
      )}
    >
      <div
        className={cn(
          "flex flex-row items-end gap-5",
          "pc lg:justify-start",
          "mobile justify-center"
        )}
      >
        <MainTitle strongText="주요사업" normalText="안내" />

        <span
          className={cn(
            "font-semibold",
            "pc lg:inline lg:text-lg",
            "mobile hidden"
          )}
        >
          한국지방교육행정연구재단의 주요사업 정보를 안내합니다.
        </span>
      </div>

      {isMobile ? <MobileMainBusiness /> : <PcMainBusiness />}
    </section>
  );
}

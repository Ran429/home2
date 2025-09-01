"use client";

import useWindowSize from "@/hooks/use-window-size";
import { FONT_ONETWOTHREE_RF } from "@/lib/font-util";
import { cn } from "@/lib/utils";

type Props = {
  useSemanticTags?: boolean;
};

export default function MainCarouselContent({ useSemanticTags }: Props) {
  const { isMobile } = useWindowSize();
  const textShadow = { textShadow: "0 0 17px white" };

  return (
    <div
      className={cn(
        "container flex flex-col h-full justify-center px-4 relative",
        "pc lg:items-end lg:text-end",
        "mobile items-center drop-shadow-lg text-center",
        FONT_ONETWOTHREE_RF.className
      )}
    >
      {useSemanticTags ? (
        <>
          <h1
            className={cn(
              "text-klea_text_primary xl:text-6xl text-3xl sm:text-4xl md:text-5xl mb-2 mt-48 lg:mt-0"
            )}
            style={isMobile ? textShadow : {}}
          >
            KLEA
          </h1>
          <h1
            className={cn(
              "xl:text-6xl text-3xl sm:text-4xl md:text-5xl mb-4 lg:mb-6"
            )}
            style={isMobile ? textShadow : {}}
          >
            한국지방교육행정연구재단
          </h1>

          <h2
            className="xl:text-2xl text-base sm:text-lg md:text-xl leading-normal"
            style={isMobile ? textShadow : {}}
          >
            안정적 교육환경의 토대를 마련하고 건전하고
            <br /> 생산적인 교육재정 운영에 기여합니다.
          </h2>
        </>
      ) : (
        <>
          <p
            className={cn(
              "text-klea_text_primary xl:text-6xl text-3xl sm:text-4xl md:text-5xl mb-2 mt-48 lg:mt-0"
            )}
            style={isMobile ? textShadow : {}}
          >
            KLEA
          </p>
          <p
            className={cn(
              "xl:text-6xl text-3xl sm:text-4xl md:text-5xl mb-4 lg:mb-6"
            )}
            style={isMobile ? textShadow : {}}
          >
            한국지방교육행정연구재단
          </p>

          <p
            className="xl:text-2xl text-base sm:text-lg md:text-xl leading-normal"
            style={isMobile ? textShadow : {}}
          >
            안정적 교육환경의 토대를 마련하고 건전하고
            <br /> 생산적인 교육재정 운영에 기여합니다.
          </p>
        </>
      )}
    </div>
  );
}

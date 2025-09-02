// src/components/common/represent-background.tsx

import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  type: "sitemap" | "introduce" | "business" | "search" | "board";
  rewriteText?: string; // 덮어쓸 타이틀
  className?: string;
};

const ImageAndTitles = {
  search: {
    image: "/images/background/bg_search.png",
    title: "통합검색",
  },
  sitemap: {
    image: "/images/background/bg_sitemap.png",
    title: "홈페이지 가이드",
  },
  introduce: {
    image: "/images/background/ihv_bg_title.jpg", 
    title: "연구소 소개", // 'KLEA 소개'를 '연구소 소개'로 변경
  },
  business: {
    image: "/images/background/bg_business_title.png",
    title: "주요활동", // '주요사업'을 '주요활동'으로 변경 (MENU_ITEMS와 통일)
  },
  board: {
    image: "/images/background/bg_notice.png",
    title: "게시판",
  },
};

/**
 * 대표 이미지, 텍스트를 넣는 영역 입니다.
 * 공통으로 자주사용되어 컴포넌트화 하여 사용합니다.
 * @returns
 */
export default function RepresentiveBackground({
  type,
  rewriteText,
  className,
}: Props) {
  const { image, title } = ImageAndTitles[type];

  return (
    <section className={cn("w-full relative lg:block hidden", className)}>
      <Image
        src={image}
        width={0}
        height={0}
        sizes="100vw"
        alt="bg_title"
        className="w-full object-cover h-[200px]"
      />

      <p
        className={cn(
          "font-semibold lg:text-[40px] text-3xl",
          "text-white drop-shadow-lg",
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
      >
        {rewriteText ?? title}
      </p>
    </section>
  );
}
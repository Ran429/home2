import SearchBoardTable from "@/components/board/search-board-table";
import BoldText from "@/components/common/bold-text";
import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import RepresentiveBackground from "@/components/common/represent-background";
import { BoardTypes } from "@/constants/board-type";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { SearchBoard, searchBoardItems } from "@/server/prisma/board.db";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import SearchForm from "./search-form";
import SearchTab from "./search-tab";
import CommonDetailSection from "@/components/common/common-detail-section";
import { Metadata } from "next";
import { CommonMetadata } from "@/constants/common-metadata";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "검색 | 한국지방교육행정연구재단",
  description: "사이트내의 게시물을 통합으로 검색합니다",
};

type Props = {
  searchParams: {
    keyword?: string;
  };
};

export default async function SearchPage({ searchParams: { keyword } }: Props) {
  const breadcrumbs = [{ href: "/", text: "홈" }, { text: "통합검색" }];

  let boardItemMap: Map<string, SearchBoard[]> | null = null;
  let totalItemCount: number | null = null;

  if (keyword) {
    const searchResults = await searchBoardItems(keyword);
    boardItemMap = searchResults.boardMap;
    totalItemCount = searchResults.totalItemCount;
  }

  return (
    <>
      <CommonBreadcrumb breadcrumbs={breadcrumbs} hiddenInMobile />
      <RepresentiveBackground type="search" />

      <section className="w-full lg:bg-klea_bg_deep_gray mt-20 lg:mt-0 py-20 lg:py-28">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h3 className="text-base lg:text-2xl font-semibold text-center lg:text-start">
            검색어{" "}
            <BoldText className="text-klea_text_primary">
              &quot;{keyword ?? ""}&quot;
            </BoldText>
            에 대하여 총{" "}
            <BoldText className="text-klea_text_primary">
              {totalItemCount}
            </BoldText>
            건의 검색결과를 찾았습니다.
          </h3>

          <SearchForm key={keyword} keyword={keyword} />
        </div>
      </section>

      <CommonDetailSection>
        <SearchTab />

        {boardItemMap &&
          BoardTypes.map((boardTypeEnum) => (
            <article
              className="my-16 lg:my-28"
              key={boardTypeEnum.code}
              id={boardTypeEnum.code.toLowerCase()}
            >
              <div className="flex flex-row justify-between">
                <h3 className="font-bold text-xl lg:text-3xl">
                  {boardTypeEnum.text} 통합검색
                </h3>
                <Link
                  href={
                    boardTypeEnum.href + "?search_type=title&keyword=" + keyword
                  }
                  className={cn(
                    "flex flex-row items-center gap-1 text-klea_text_primary font-semibold text-base lg:text-xl",
                    HOVER_CLASSNAME
                  )}
                >
                  더보기
                  <ChevronRight />
                </Link>
              </div>

              <SearchBoardTable
                items={boardItemMap.get(boardTypeEnum.code) ?? []}
                boardType={boardTypeEnum}
              />
            </article>
          ))}
      </CommonDetailSection>
    </>
  );
}

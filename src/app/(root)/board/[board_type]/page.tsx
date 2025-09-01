import BoardSearch from "@/components/board/board-search";
import BoardTab from "@/components/board/board-tab";
import BoardTable from "@/components/board/board-table";
import BoldText from "@/components/common/bold-text";
import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import Divider from "@/components/common/divider";
import Paging from "@/components/common/paging";
import RepresentiveBackground from "@/components/common/represent-background";
import { getBoardTypeEnum, isValidBoardType } from "@/constants/board-type";
import { CommonMetadata } from "@/constants/common-metadata";
import { cn } from "@/lib/utils";
import { getBoardItems } from "@/server/prisma/board.db";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "게시판 | 한국지방교육행정연구재단",
  description: "정보자료를 제공하는 게시판입니다",
};

type Props = {
  params: {
    board_type?: string;
  };
  searchParams: {
    page?: string;
    search_type?: string;
    keyword?: string;
  };
};

export default async function BoardListPage({
  params: { board_type },
  searchParams: { page: _page = "1", search_type, keyword },
}: Props) {
  const boardType = board_type?.toUpperCase();
  const page = Number(_page);

  if (!boardType || !isValidBoardType(boardType)) {
    return notFound();
  }

  const boardTypeEnum = getBoardTypeEnum(boardType);
  if (!boardTypeEnum) {
    return notFound();
  }

  if (Number.isNaN(page) || page < 1) {
    return redirect(boardTypeEnum.href + "?page=1");
  }

  const { items, totalItemCount, totalPage } = await getBoardItems({
    boardType: boardTypeEnum,
    page,
    searchType: search_type,
    keyword,
  });

  return (
    <>
      <CommonBreadcrumb
        breadcrumbs={boardTypeEnum.breadcrumbs}
        hiddenInMobile
      />
      <RepresentiveBackground type="board" rewriteText={boardTypeEnum.text} />

      <section
        className={cn(
          "container mb-20 px-5",
          "pc lg:mt-[71px]",
          "mobile mt-28"
        )}
      >
        <BoardTab boardType={boardTypeEnum} />
        <BoardSearch />

        <div className="lg:mt-16 mt-10">
          <p className="text-base">
            총{" "}
            <BoldText className="text-klea_text_primary">
              {totalItemCount}
            </BoldText>
            건 (<BoldText className="text-klea_text_primary">{page}</BoldText> /{" "}
            {totalPage} 페이지)
          </p>
        </div>

        <Divider className="mt-5 bg-klea_text_primary h-[2px]" />

        <BoardTable
          items={items}
          boardType={boardTypeEnum}
          currentPage={page}
          totalItemCount={totalItemCount}
        />

        <div className="lg:mt-16 mt-10">
          <Paging
            currentPage={page}
            totalPage={totalPage}
            baseUrl={boardTypeEnum.href}
          />
        </div>
      </section>
    </>
  );
}

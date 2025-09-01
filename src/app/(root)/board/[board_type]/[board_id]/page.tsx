import { UploadFile } from "@/@types/upload-file";
import BoardDownloadButton from "@/components/board/board-download-button";
import BoardTab from "@/components/board/board-tab";
import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import Divider from "@/components/common/divider";
import DividerY from "@/components/common/divider-y";
import RepresentiveBackground from "@/components/common/represent-background";
import { getBoardTypeEnum, isValidBoardType } from "@/constants/board-type";
import { CommonMetadata } from "@/constants/common-metadata";
import { yyyymmdd } from "@/lib/time-util";
import { cn } from "@/lib/utils";
import BoardDB, { updateViewCount } from "@/server/prisma/board.db";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "게시판 | 한국지방교육행정연구재단",
  description: "정보자료를 제공하는 게시판입니다",
};

type Props = {
  params: {
    board_type?: string;
    board_id?: string;
  };
};

export default async function BoardDetailPage({
  params: { board_type, board_id },
}: Props) {
  const boardId = Number(board_id);
  const boardType = board_type?.toUpperCase();

  if (!boardType || !isValidBoardType(boardType) || Number.isNaN(boardId)) {
    return notFound();
  }

  const boardTypeEnum = getBoardTypeEnum(boardType);
  if (!boardTypeEnum) {
    return notFound();
  }

  const boardItem = await BoardDB.getBoardItemWithPrevNext(boardType, boardId);
  if (!boardItem) {
    return notFound();
  }

  await updateViewCount(boardTypeEnum, boardId);

  const { item, nextItem, prevItem } = boardItem;

  return (
    <>
      <CommonBreadcrumb
        breadcrumbs={boardTypeEnum.breadcrumbs}
        hiddenInMobile
      />
      <RepresentiveBackground type="board" rewriteText={boardTypeEnum.text} />

      <section
        className={cn("container px-5", "pc lg:mt-[71px]", "mobile mt-28")}
      >
        <BoardTab boardType={boardTypeEnum} classname="hidden lg:block" />

        <h2 className="text-[24px] lg:text-[28px] font-bold lg:mt-[71px] mt-0">
          {item.title}
        </h2>

        <div
          className={cn(
            "flex py-5",
            "pc lg:flex-row lg:gap-6",
            "mobile flex-col gap-3"
          )}
        >
          <div className="flex flex-row gap-3 text-[15px] lg:text-[17px]">
            <span className="font-medium">작성자</span>
            <span className="font-normal text-[#888888]">{item.createdBy}</span>
          </div>
          <DividerY className="hidden lg:block bg-klea_box_border h-[15px] mt-1" />
          <div className="flex flex-row gap-3 text-[15px] lg:text-[17px]">
            <span className="font-medium">등록일</span>
            <span className="font-normal text-[#888888]">
              {yyyymmdd(item.createdAt)}
            </span>
          </div>
          <DividerY className="hidden lg:block bg-klea_box_border h-[15px] mt-1" />
          <div className="flex flex-row gap-3 text-[15px] lg:text-[17px]">
            <span className="font-medium">조회수</span>
            <span className="font-normal text-[#888888]">{item.viewCount}</span>
          </div>
        </div>

        <Divider className="!bg-black mt-3" />

        <div
          dangerouslySetInnerHTML={{ __html: item.content }}
          className="py-12"
        />

        <Divider className="!bg-[#E5E5E5]" />

        <div className="flex flex-col">
          {item.files && (
            <>
              <div className="py-5 flex flex-row gap-10">
                <span className="font-medium text-base">첨부파일</span>
                <div className="flex flex-col gap-2">
                  {item.files &&
                    (item.files as UploadFile[]).map((file) => (
                      <BoardDownloadButton key={file.id} file={file} />
                    ))}
                </div>
              </div>
              <Divider className="!bg-[#E5E5E5]" />
            </>
          )}

          {prevItem && (
            <>
              <div className="py-5 flex flex-row gap-12">
                <span className="font-semibold text-base">이전 글</span>
                <Link
                  href={`${boardTypeEnum.href}/${prevItem.id}`}
                  className="text-base font-normal text-[#555555] hover:opacity-50 active:opacity-50 transition-opacity"
                >
                  {prevItem.title}
                </Link>
                <span className="hidden lg:block flex-none ml-auto text-base font-normal text-[#555555]">
                  {yyyymmdd(prevItem.createdAt)}
                </span>
              </div>
              <Divider className="!bg-[#E5E5E5]" />
            </>
          )}

          {nextItem && (
            <>
              <div className="py-5 flex flex-row gap-12">
                <span className="font-semibold text-base">다음 글</span>
                <Link
                  href={`${boardTypeEnum.href}/${nextItem.id}`}
                  className="text-base font-normal text-[#555555] hover:opacity-50 active:opacity-50 transition-opacity"
                >
                  {nextItem.title}
                </Link>
                <span className="hidden lg:block flex-none ml-auto text-base font-normal text-[#555555]">
                  {yyyymmdd(nextItem.createdAt)}
                </span>
              </div>
              <Divider className="!bg-[#E5E5E5]" />
            </>
          )}
        </div>

        <div className="w-full flex justify-center mt-12 lg:mt-[71px]">
          <Link
            href={boardTypeEnum.href}
            className={cn(
              "text-center w-full lg:w-auto px-28 bg-white py-4",
              "rounded-md lg:rounded-[30px] border-klea_text_primary border", // border
              "font-bold text-xl text-klea_text_primary", // font
              "hover:opacity-50 active:opacity-50 transition-opacity"
            )}
          >
            목록
          </Link>
        </div>
      </section>
    </>
  );
}

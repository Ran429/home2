import { UploadFile } from "@/@types/upload-file";
import BoardTab from "@/components/board/board-tab";
import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import Divider from "@/components/common/divider";
import DividerY from "@/components/common/divider-y";
import RepresentiveBackground from "@/components/common/represent-background";
import { BoardType } from "@/constants/board-type";
import { CommonMetadata } from "@/constants/common-metadata";
import { getUploadFileUrl } from "@/lib/client-file-util";
import { yyyymmdd } from "@/lib/time-util";
import { cn } from "@/lib/utils";
import BoardDB, { updateViewCount } from "@/server/prisma/board.db";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "갤러리 | 한국지방교육행정연구재단",
  description: "행사등의 이미지 자료가 포함된 정보게시판입니다",
};

type Props = {
  params: {
    board_id?: string;
  };
};

export default async function GalleryDetailPage({
  params: { board_id },
}: Props) {
  const boardId = Number(board_id);

  if (Number.isNaN(boardId)) {
    return notFound();
  }

  const boardTypeEnum = BoardType.GALLERY;
  if (!boardTypeEnum) {
    return notFound();
  }

  const boardItem = await BoardDB.getBoardItemWithPrevNext(
    boardTypeEnum.code,
    boardId
  );
  if (!boardItem) {
    return notFound();
  }

  await updateViewCount(boardTypeEnum, boardId);

  const { item, nextItem, prevItem } = boardItem;
  const images = (item.images ?? []) as UploadFile[];

  return (
    <>
      <CommonBreadcrumb
        breadcrumbs={boardTypeEnum.breadcrumbs}
        hiddenInMobile
      />

      <RepresentiveBackground type="board" rewriteText={boardTypeEnum.text} />

      <section
        className={cn("container px-5", "pc lg:mt-[71px]", "mobile mt-32")}
      >
        <BoardTab boardType={boardTypeEnum} classname="hidden lg:block" />

        <h2 className="text-[27px] font-bold lg:mt-[71px] mt-0">
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

        <div className="pt-12 flex flex-col gap-5">
          {images &&
            images.map((image) => (
              <Link
                key={image.id}
                href={getUploadFileUrl(image)}
                target="_blank"
              >
                <Image
                  src={getUploadFileUrl(image)}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt={image.fileName}
                  className="w-full lg:w-1/2 aspect-auto"
                />
              </Link>
            ))}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: item.content }}
          className="py-12"
        />

        <Divider className="!bg-[#E5E5E5]" />
        <div className="flex flex-col">
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
                <span className="flex-none ml-auto text-base font-normal text-[#555555]">
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
              "rounded-md lg:rounded-3xl border-klea_text_primary border", // border
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

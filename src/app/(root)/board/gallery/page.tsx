import { UploadFile } from "@/@types/upload-file";
import BoardSearch from "@/components/board/board-search";
import BoardTab from "@/components/board/board-tab";
import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import Paging from "@/components/common/paging";
import RepresentiveBackground from "@/components/common/represent-background";
import { BoardType } from "@/constants/board-type";
import { CommonMetadata } from "@/constants/common-metadata";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { getUploadFileUrl } from "@/lib/client-file-util";
import { yyyymmdd } from "@/lib/time-util";
import { cn } from "@/lib/utils";
import { getBoardItems } from "@/server/prisma/board.db";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "갤러리 | 한국지방교육행정연구재단",
  description: "행사등의 이미지 자료가 포함된 정보게시판입니다",
};

type Props = {
  searchParams: {
    page?: string;
    search_type?: string;
    keyword?: string;
  };
};

export default async function GalleryListPage({
  searchParams: { page: _page = "1", search_type, keyword },
}: Props) {
  const page = Number(_page);
  const boardTypeEnum = BoardType.GALLERY;

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
        className={cn("container px-5", "pc lg:mt-[71px]", "mobile mt-28")}
      >
        <BoardTab boardType={boardTypeEnum} />
        <BoardSearch />

        <div className="lg:mt-16 mt-10">
          <p className="text-base">
            총{" "}
            <strong className="text-klea_text_primary">{totalItemCount}</strong>
            건 (<strong className="text-klea_text_primary">{page}</strong> /{" "}
            {totalPage} 페이지)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          {items.map((item) => (
            <Link
              href={`/board/gallery/${item.id}`}
              key={item.id}
              className={cn(
                "flex justify-end flex-col max-h-[300px]",
                "rounded-xl border border-klea_box_border",
                "mobile w-full aspect-[2/1]",
                HOVER_CLASSNAME
              )}
            >
              {item.images && (
                <GalleryImage image={(item.images as UploadFile[])[0]} />
              )}

              <div className="px-7 py-6">
                <h3 className="text-[17px] lg:text-xl font-bold">
                  {item.title}
                </h3>
                <div
                  className={cn(
                    "flex flex-row gap-1.5 mt-1 items-center",
                    "text-[#777777] font-medium text-[15px]"
                  )}
                >
                  <span>{yyyymmdd(item.createdAt)}</span>
                  <span className="flex flex-row gap-0.5 items-center">
                    <span>ㆍ</span>
                    <span>{item.createdBy}</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

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

function GalleryImage({ image }: { image: UploadFile }) {
  return (
    <Image
      src={getUploadFileUrl(image)}
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-full object-cover rounded-t-[inherit]"
      alt={image.fileName}
    />
  );
}

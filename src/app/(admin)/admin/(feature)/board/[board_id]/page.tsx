import { UploadFile } from "@/@types/upload-file";
import BoardDownloadButton from "@/components/board/board-download-button";
import Divider from "@/components/common/divider";
import DividerY from "@/components/common/divider-y";
import RepresentiveBackground from "@/components/common/represent-background";
import { getUploadFileUrl } from "@/lib/client-file-util";
import { yyyymmdd } from "@/lib/time-util";
import { cn } from "@/lib/utils";
import { getBoardItem } from "@/server/prisma/board.db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminBoardDetailButtons from "./board-detail-buttons";

type Props = {
  params: {
    board_id?: string;
  };
};

export default async function AdminBoardPage({ params: { board_id } }: Props) {
  const boardId = Number(board_id);

  if (Number.isNaN(boardId)) {
    return notFound();
  }

  const boardItem = await getBoardItem(boardId);
  if (!boardItem) {
    return notFound();
  }

  return (
    <>
      <RepresentiveBackground
        type="board"
        rewriteText="게시물 관리"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">게시물 관리 - 상세</h1>
        </div>

        <h2 className="text-[24px] lg:text-[28px] font-bold lg:mt-[71px] mt-0">
          {boardItem.title}
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
            <span className="font-normal text-[#888888]">
              {boardItem.createdBy}
            </span>
          </div>
          <DividerY className="hidden lg:block bg-klea_box_border h-[15px] mt-1" />
          <div className="flex flex-row gap-3 text-[15px] lg:text-[17px]">
            <span className="font-medium">등록일</span>
            <span className="font-normal text-[#888888]">
              {yyyymmdd(boardItem.createdAt)}
            </span>
          </div>
          <DividerY className="hidden lg:block bg-klea_box_border h-[15px] mt-1" />
          <div className="flex flex-row gap-3 text-[15px] lg:text-[17px]">
            <span className="font-medium">조회수</span>
            <span className="font-normal text-[#888888]">
              {boardItem.viewCount}
            </span>
          </div>
        </div>

        <Divider className="!bg-black mt-3" />

        {boardItem.images && (
          <div className="pt-12 flex flex-col gap-5">
            {(boardItem.images as UploadFile[]).map((image) => (
              <Link
                key={image.id}
                href={getUploadFileUrl(image as UploadFile)}
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
        )}

        <div
          dangerouslySetInnerHTML={{ __html: boardItem.content }}
          className="py-12"
        />

        <Divider className="!bg-[#E5E5E5]" />

        <div className="flex flex-col">
          {boardItem.files && (
            <>
              <div className="py-5 flex flex-row gap-10">
                <span className="font-medium text-base">첨부파일</span>
                <div className="flex flex-col gap-2">
                  {boardItem.files &&
                    (boardItem.files as UploadFile[]).map((file) => (
                      <BoardDownloadButton key={file.id} file={file} />
                    ))}
                </div>
              </div>
              <Divider className="!bg-[#E5E5E5]" />
            </>
          )}
        </div>

        <AdminBoardDetailButtons boardId={boardItem.id} />
      </section>
    </>
  );
}

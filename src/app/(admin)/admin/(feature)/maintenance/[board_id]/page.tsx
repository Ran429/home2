import { UploadFile } from "@/@types/upload-file";
import { auth } from "@/auth";
import BoardDownloadButton from "@/components/board/board-download-button";
import Divider from "@/components/common/divider";
import DividerY from "@/components/common/divider-y";
import RepresentiveBackground from "@/components/common/represent-background";
import { getUploadFileUrl } from "@/lib/client-file-util";
import { yyyymmddhhmmss } from "@/lib/time-util";
import { cn } from "@/lib/utils";
import AdminMaintenanceBoardReplyDB from "@/server/prisma/admin-maintenance-board-reply.db";
import AdminMaintenanceBoardDB from "@/server/prisma/admin-maintenance-board.db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminMaintenanceBoardReplyList from "./(reply)/reply-list";
import AdminMaintenanceBoardDetailButtons from "./board-detail-buttons";

type Props = {
  params: {
    board_id?: string;
  };
};

export default async function AdminMaintenanceBoardDetailPage({
  params: { board_id },
}: Props) {
  const boardId = Number(board_id);
  const session = await auth();
  const loginUserId = session?.user?.id;

  if (!loginUserId) {
    throw Error("로그인 후 이용해주세요");
  }

  if (Number.isNaN(boardId)) {
    return notFound();
  }

  const boardItem = await AdminMaintenanceBoardDB.findByIdAndActive(boardId);
  if (!boardItem) {
    return notFound();
  }

  const replies = await AdminMaintenanceBoardReplyDB.findAllActiveByBoardId(
    boardId
  );

  return (
    <>
      <RepresentiveBackground
        type="board"
        rewriteText="유지보수 현황"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">유지보수 현황 - 상세</h1>
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
              {boardItem.createdUser.name}
            </span>
          </div>
          <DividerY className="hidden lg:block bg-klea_box_border h-[15px] mt-1" />
          <div className="flex flex-row gap-3 text-[15px] lg:text-[17px]">
            <span className="font-medium">등록일</span>
            <span className="font-normal text-[#888888]">
              {yyyymmddhhmmss(boardItem.createdAt)}
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

        <AdminMaintenanceBoardReplyList
          replies={replies}
          boardId={boardItem.id}
          loginUserId={Number(loginUserId)}
        />
        <AdminMaintenanceBoardDetailButtons boardId={boardItem.id} />
      </section>
    </>
  );
}

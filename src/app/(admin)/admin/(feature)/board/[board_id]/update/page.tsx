import { auth } from "@/auth";
import RepresentiveBackground from "@/components/common/represent-background";
import { cn } from "@/lib/utils";
import { getBoardItem } from "@/server/prisma/board.db";
import { notFound } from "next/navigation";
import UpdateBoardForm from "./update-form";

type Props = {
  params: {
    board_id?: string;
  };
};

export default async function AdminBoardUpdatePage({
  params: { board_id },
}: Props) {
  const session = await auth();
  const adminName = session?.user?.email ?? "관리자";
  const boardId = Number(board_id);

  if (Number.isNaN(board_id)) {
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
          <h1 className="text-3xl font-bold">게시물 수정</h1>
        </div>

        <UpdateBoardForm adminName={adminName} boardItem={boardItem} />
      </section>
    </>
  );
}

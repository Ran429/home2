import RepresentiveBackground from "@/components/common/represent-background";
import { cn } from "@/lib/utils";
import AdminMaintenanceBoardDB from "@/server/prisma/admin-maintenance-board.db";
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
  const boardId = Number(board_id);

  if (Number.isNaN(board_id)) {
    return notFound();
  }

  const boardItem = await AdminMaintenanceBoardDB.findByIdAndActive(boardId);
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

        <UpdateBoardForm boardItem={boardItem} />
      </section>
    </>
  );
}

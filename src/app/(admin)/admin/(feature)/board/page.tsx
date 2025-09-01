import AdminBoardSearch from "@/components/admin/board/admin-board-search";
import AdminBoardTab from "@/components/admin/board/admin-board-tab";
import AdminBoardTable from "@/components/admin/board/admin-board-table";
import Paging from "@/components/common/paging";
import RepresentiveBackground from "@/components/common/represent-background";
import { getBoardTypeEnum } from "@/constants/board-type";
import { cn } from "@/lib/utils";
import { getBoardItems } from "@/server/prisma/board.db";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    page?: string;
    board_type: string;
    search_type?: string;
    keyword?: string;
  };
};

export default async function AdminNoticeListPage({
  searchParams: { page: _page, board_type, search_type, keyword },
}: Props) {
  const page = Number(_page);

  if (Number.isNaN(page) || page < 1) {
    return redirect("/admin/board?page=1");
  }

  const { items, totalItemCount, totalPage } = await getBoardItems({
    page,
    boardType: getBoardTypeEnum(board_type),
    searchType: search_type,
    keyword,
  });

  return (
    <>
      <RepresentiveBackground
        type="board"
        rewriteText="게시물 관리"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">게시물 관리</h1>
          <Link
            href="/admin/board/create"
            className="daisy-btn daisy-btn-primary"
          >
            추가
          </Link>
        </div>

        <AdminBoardTab currentBoardType={board_type} />
        <AdminBoardSearch />
        <AdminBoardTable
          items={items}
          currentPage={page}
          totalItemCount={totalItemCount}
        />

        <div className="mt-16">
          <Paging
            currentPage={page}
            totalPage={totalPage}
            baseUrl={"/admin/board/"}
          />
        </div>
      </section>
    </>
  );
}

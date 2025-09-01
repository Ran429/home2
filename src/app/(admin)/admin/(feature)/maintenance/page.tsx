import AdminBoardSearch from "@/components/admin/board/admin-board-search";
import AdminMaintenanceBoardTable from "@/components/admin/maintenance/admin-maintenance-board-table";
import Paging from "@/components/common/paging";
import RepresentiveBackground from "@/components/common/represent-background";
import { cn } from "@/lib/utils";
import AdminMaintenanceBoardDB from "@/server/prisma/admin-maintenance-board.db";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    page?: string;
    search_type?: string;
    keyword?: string;
  };
};

export default async function AdminNoticeListPage({
  searchParams: { page: _page, search_type, keyword },
}: Props) {
  const page = Number(_page);

  if (Number.isNaN(page) || page < 1) {
    return redirect("/admin/maintenance?page=1");
  }

  const { items, totalItemCount, totalPage } =
    await AdminMaintenanceBoardDB.findAll({
      page,
      searchType: search_type,
      keyword,
    });

  return (
    <>
      <RepresentiveBackground
        type="board"
        rewriteText="유지보수 현황"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">유지보수 현황</h1>
          <Link
            href="/admin/maintenance/create"
            className="daisy-btn daisy-btn-primary"
          >
            추가
          </Link>
        </div>

        <AdminBoardSearch />
        <AdminMaintenanceBoardTable
          items={items}
          currentPage={page}
          totalItemCount={totalItemCount}
        />

        <div className="mt-16">
          <Paging
            currentPage={page}
            totalPage={totalPage}
            baseUrl={"/admin/maintenance/"}
          />
        </div>
      </section>
    </>
  );
}

// src/app/(root)/admin/activities/page.tsx
import { getBoardItems } from "@/server/prisma/board.db";
import { BoardTypeMap } from "@/constants/board-type";
import AdminNavbar from "@/components/admin/common/admin-navbar";
import AdminActivitiesTable from "@/components/admin/activities/admin-activities-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminActivitiesPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const items = await getBoardItems({
    boardType: BoardTypeMap.INSTITUTE_EVENTS,
    page: currentPage,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <main className="flex-1 container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">행사 관리</h1>

        {/* ✅ 글 작성하기 버튼 */}
        <div className="flex justify-end mb-4">
          <Link href="/admin/activities/new">
            <Button>글 작성하기</Button>
          </Link>
        </div>

        {/* ✅ 행사 목록 테이블 */}
        <AdminActivitiesTable
          items={items.items}
          currentPage={currentPage}
          totalItemCount={items.totalItemCount}
        />
      </main>
    </div>
  );
}
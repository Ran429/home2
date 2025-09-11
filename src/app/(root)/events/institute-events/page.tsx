import { getBoardItems } from "@/server/prisma/board.db";
import { BoardTypeMap } from "@/constants/board-type";
import { BoardViewMap } from "@/constants/board-view-map";
import BoardList from "@/components/board/BoardList";
import BoardGallery from "@/components/board/BoardGallery";

export const metadata = {
  title: "연구소 행사 - 인간취약성연구소",
};

export default async function InstituteEventsPage({
  searchParams,
}: {
  searchParams?: { page?: string; keyword?: string; searchType?: string };
}) {
  const boardType = BoardTypeMap.INSTITUTE_EVENTS;
  const currentPage = Number(searchParams?.page) || 1;

  const items = await getBoardItems({
    boardType,
    page: currentPage,
    keyword: searchParams?.keyword,
    searchType: searchParams?.searchType,
  });

  const viewType = BoardViewMap[boardType.code];

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">{boardType.text}</h1>

      {viewType === "list" ? (
        <BoardList
          items={items.items}
          totalItemCount={items.totalItemCount}
          currentPage={currentPage}
          basePath="/events/institute-events"
        />
      ) : (
        <BoardGallery
          items={items.items}
          totalItemCount={items.totalItemCount}
          currentPage={currentPage}
          basePath="/events/institute-events"
        />
      )}
    </div>
  );
}
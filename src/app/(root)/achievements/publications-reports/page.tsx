import { getBoardItems } from "@/server/prisma/board.db";
import { BoardTypeMap } from "@/constants/board-type";
import { BoardViewMap } from "@/constants/board-view-map";
import BoardList from "@/components/board/BoardList";
import BoardGallery from "@/components/board/BoardGallery";

export const metadata = {
  title: "출판물 및 보고서 - 인간취약성연구소",
};

export default async function PublicationsReportsPage() {
  const boardType = BoardTypeMap.PUBLICATIONS_REPORTS;
  const items = await getBoardItems({ boardType, page: 1 });

  const viewType = BoardViewMap[boardType.code]; // 여기서 "gallery"로 매핑해야 함

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">{boardType.text}</h1>

      {viewType === "list" ? (
        <BoardList
          items={items.items}
          totalItemCount={items.totalItemCount}
          currentPage={1}
          basePath="/achievements/publications-reports"
        />
      ) : (
        <BoardGallery
          items={items.items}
          totalItemCount={items.totalItemCount}
          currentPage={1}
          basePath="/achievements/publications-reports"
        />
      )}
    </div>
  );
}
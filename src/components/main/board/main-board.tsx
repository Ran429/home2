import { BoardType } from "@/constants/board-type";
import { cn } from "@/lib/utils";
import BoardDB from "@/server/prisma/board.db";
import MainBoardArticle from "./main-board-article";

export default async function MainBoard() {
  const targetBoardTypes = [
    BoardType.NOTICE,
    BoardType.RECRUIT,
    BoardType.BIDDING,
  ];

  const targetBoardTypes2 = [BoardType.LEGAL, BoardType.PRESS];

  const boardItems = await BoardDB.getMainBoard(
    targetBoardTypes.map((it) => it.code)
  );
  const boardItems2 = await BoardDB.getMainBoard(
    targetBoardTypes2.map((it) => it.code)
  );

  return (
    <section
      className={cn(
        "w-full container flex px-4",
        "pc lg:mt-20 lg:gap-4 lg:flex-row",
        "mobile mt-[58px] gap-10 flex-col"
      )}
    >
      <MainBoardArticle
        title="KLEA 소식"
        boardItems={boardItems}
        tabs={[
          {
            code: "ALL",
            text: "전체",
            breadcrumbs: [],
            group: "krleaf_news",
            href: "/",
          },
          ...targetBoardTypes,
        ]}
      />
      <MainBoardArticle
        title="정보자료"
        backgroundColor="bg-[#ECF0F5]"
        boardItems={boardItems2}
        tabs={[
          {
            code: "ALL",
            text: "전체",
            breadcrumbs: [],
            group: "information",
            href: "/",
          },
          ...targetBoardTypes2,
        ]}
      />
    </section>
  );
}

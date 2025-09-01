import { Board } from "@prisma/client";

export type MainBoardType = Pick<
  Board,
  "id" | "boardType" | "createdAt" | "title"
>;

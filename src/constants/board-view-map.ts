// src/constants/board-view-map.ts
import { BoardTypeMap } from "./board-type";

export const BoardViewMap = {
  // 행사·소식
  [BoardTypeMap.INSTITUTE_EVENTS.code]: "list",
  [BoardTypeMap.ANNOUNCEMENTS.code]: "list",

  // 주요활동
  [BoardTypeMap.RESEARCH_PROJECTS.code]: "list",
  [BoardTypeMap.SOCIAL_CONTRIBUTION.code]: "list",

  // 성과 (리스트형만 게시판에서 관리)
  [BoardTypeMap.RESEARCH_OUTCOMES.code]: "list",
} as const;

export type BoardViewType = "list";
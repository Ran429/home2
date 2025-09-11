import { BoardTypeMap } from "./board-type";

export const BoardViewMap = {
  // 행사·소식
  [BoardTypeMap.INSTITUTE_EVENTS.code]: "list",
  [BoardTypeMap.ANNOUNCEMENTS.code]: "list",

  // 주요활동
  [BoardTypeMap.RESEARCH_PROJECTS.code]: "list",
  [BoardTypeMap.EDUCATION_WORKSHOPS.code]: "gallery",
  [BoardTypeMap.SOCIAL_CONTRIBUTION.code]: "list",

  // 성과
  [BoardTypeMap.RESEARCH_OUTCOMES.code]: "list",
  [BoardTypeMap.PUBLICATIONS_REPORTS.code]: "gallery",
  [BoardTypeMap.MEDIA_COVERAGE.code]: "gallery",
} as const;

export type BoardViewType = "list" | "gallery";
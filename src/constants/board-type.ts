// src/server/prisma/board-type.ts
export const BoardTypeMap = {
  // 행사·소식
  INSTITUTE_EVENTS: { code: "institute-events", text: "연구소 행사" },
  ANNOUNCEMENTS: { code: "announcements", text: "연구소 공시·공고" },

  // 주요활동
  RESEARCH_PROJECTS: { code: "research-projects", text: "연구 프로젝트" },
  SOCIAL_CONTRIBUTION: { code: "social-contribution", text: "사회공헌활동" },

  // 성과
  RESEARCH_OUTCOMES: { code: "research-outcomes", text: "연구성과" },
} as const;

export const BoardTypes = Object.values(BoardTypeMap);
export type BoardType = (typeof BoardTypes)[number];
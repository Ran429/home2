export const BoardTypeMap = {
  // 행사·소식
  INSTITUTE_EVENTS: { code: "institute-events", text: "연구소 행사" },
  ANNOUNCEMENTS: { code: "announcements", text: "연구소 공시·공고" },

  // 주요활동
  RESEARCH_PROJECTS: { code: "research-projects", text: "연구 프로젝트" },
  EDUCATION_WORKSHOPS: { code: "education-workshops", text: "교육 및 워크숍" },
  SOCIAL_CONTRIBUTION: { code: "social-contribution", text: "사회공헌활동" },

  // 성과
  RESEARCH_OUTCOMES: { code: "research-outcomes", text: "연구성과" },
  PUBLICATIONS_REPORTS: { code: "publications-reports", text: "출판물 및 보고서" },
  MEDIA_COVERAGE: { code: "media-coverage", text: "미디어 보도" },
};

export const BoardTypes = [
  BoardTypeMap.INSTITUTE_EVENTS,
  BoardTypeMap.ANNOUNCEMENTS,
  BoardTypeMap.RESEARCH_PROJECTS,
  BoardTypeMap.EDUCATION_WORKSHOPS,
  BoardTypeMap.SOCIAL_CONTRIBUTION,
  BoardTypeMap.RESEARCH_OUTCOMES,
  BoardTypeMap.PUBLICATIONS_REPORTS,
  BoardTypeMap.MEDIA_COVERAGE,
];

export type BoardType = (typeof BoardTypes)[number];

export function getBoardTypeEnum(code: string) {
  return BoardTypes.find((type) => type.code === code);
}
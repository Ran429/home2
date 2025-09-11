// Defines the navigation structure for the Institute for Human Vulnerability website.

export interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

export const MENU_ITEMS: NavItem[] = [
  {
    label: "소개",
    href: "/introduction",
    subItems: [
      { label: "인간취약성이란", href: "/introduction/what-is-vulnerability" },
      { label: "연구소의 연혁과 철학", href: "/introduction/history-and-philosophy" },
      { label: "연구소 한눈에 보기", href: "/introduction/at-a-glance" },
      { label: "함께하는 이들", href: "/introduction/people" },
      { label: "윤리 및 운영 헌장", href: "/introduction/ethics-charter" },
    ],
  },
  {
    label: "주요활동",
    href: "/activities",
    subItems: [
      { label: "연구 프로젝트", href: "/activities/research-projects" },
      { label: "교육 및 워크숍", href: "/activities/education-workshops" },
      { label: "사회공헌활동", href: "/activities/social-contribution" },
    ],
  },
  {
    label: "성과",
    href: "/achievements",
    subItems: [
      { label: "연구성과", href: "/achievements/research-outcomes" },
      { label: "출판물 및 보고서", href: "/achievements/publications-reports" },
      { label: "미디어 보도", href: "/achievements/media-coverage" },
    ],
  },
  {
    label: "행사·소식",
    href: "/events",
    subItems: [
      { label: "연구소 행사", href: "/events/institute-events" },
      { label: "연구소 공시·공고", href: "/events/announcements" },
    ],
  },
  {
    label: "협력사십",
    href: "/partnerships",
  },
];

export const IntroduceType = {
  INTRODUCE: {
    title: "소개",
    href: "/introduce",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "KLEA 소개" },
      {
        href: "/introduce",
        text: "소개",
      },
    ],
  },
  TIMELINE: {
    title: "연혁",
    href: "/introduce/timeline",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "KLEA 소개" },
      {
        href: "/introduce/timeline",
        text: "연혁",
      },
    ],
  },
  ORGANIZATION: {
    title: "조직 및 업무",
    href: "/introduce/organization",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "KLEA 소개" },
      {
        href: "/introduce/organization",
        text: "조직 및 업무",
      },
    ],
  },
  LOGO: {
    title: "로고 소개",
    href: "/introduce/logo",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "KLEA 소개" },
      {
        href: "/introduce/logo",
        text: "로고 소개",
      },
    ],
  },
  MAP: {
    title: "찾아오시는 길",
    href: "/introduce/map",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "KLEA 소개" },
      {
        href: "/introduce/map",
        text: "찾아오시는 길",
      },
    ],
  },
};

export const IntroduceTypes = [
  IntroduceType.INTRODUCE,
  IntroduceType.TIMELINE,
  IntroduceType.ORGANIZATION,
  IntroduceType.LOGO,
  IntroduceType.MAP,
];

export function getIntroduceType(pathname: string) {
  return IntroduceTypes.find((it) => pathname === it.href);
}

export type IntroduceType = (typeof IntroduceType)[keyof typeof IntroduceType];

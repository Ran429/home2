/**
 * 전체 사이트의 메뉴를 관리하는 변수
 *
 * 해당 menu 변수 추가 시
 * 사이트맵
 * 상단 navbar
 * 에 반영됩니다
 */
export const KLEA_MENU = [
  {
    text: "주요사업",
    depth: 1,
    hash: "#business",
    children: [
      {
        text: "사업소개",
        depth: 2,
        href: "/business",
      },
      {
        text: "지방교육행정기관 재정투자사업 투자심사 지원",
        depth: 2,
        children: [
          {
            text: "재정투자심사 지원",
            depth: 3,
            href: "/business/regional/investment",
          },
        ],
        href: undefined,
      },
      {
        text: "교육행정기관 컨설팅 및 시스템 운영ㆍ관리",
        depth: 2,
        children: [
          {
            text: "학교설립 담당업무 교육지원 프로그램 운영",
            depth: 3,
            href: "/business/operating/educational",
          },
          {
            text: "학생배치ㆍ학교설립 지원시스템 운영ㆍ관리",
            depth: 3,
            href: "/business/operating/establishment",
          },
          {
            text: "학구도 정보시스템 운영ㆍ관리",
            depth: 3,
            href: "/business/operating/system",
          },
        ],
        href: undefined,
        hasBottomDivider: true,
      },
      {
        text: "지방교육행정기관 타당성조사",
        depth: 2,
        href: "/business/feasibility",
      },
      {
        text: "특별교부금 운영ㆍ지원",
        depth: 2,
        href: "/business/special-grant",
      },
    ],
  },
  {
    text: "KLEA 소식",
    depth: 1,
    hash: "#news",
    children: [
      {
        text: "공지사항",
        depth: 2,
        href: "/board/notice",
      },
      {
        text: "채용정보",
        depth: 2,
        href: "/board/recruit",
      },
      {
        text: "입찰공고",
        depth: 2,
        href: "/board/bidding",
      },
      {
        text: "갤러리",
        depth: 2,
        href: "/board/gallery",
      },
    ],
  },
  {
    text: "정보자료",
    depth: 1,
    hash: "#info",
    children: [
      {
        text: "정보시스템",
        depth: 2,
        href: "/info",
      },
      {
        text: "법령자료",
        depth: 2,
        href: "/board/legal",
      },
      {
        text: "보도자료",
        depth: 2,
        href: "/board/press",
      },
    ],
  },
  {
    text: "KLEA 소개",
    depth: 1,
    hash: "#introduce",
    children: [
      {
        text: "소개",
        depth: 2,
        href: "/introduce",
      },
      {
        text: "연혁",
        depth: 2,
        href: "/introduce/timeline",
      },
      {
        text: "조직 및 업무",
        depth: 2,
        href: "/introduce/organization",
      },
      {
        text: "로고 소개",
        depth: 2,
        href: "/introduce/logo",
      },
      {
        text: "찾아오시는 길",
        depth: 2,
        href: "/introduce/map",
      },
    ],
  },
];

export const FIRST_MENU = KLEA_MENU.filter((menu) => menu.depth === 1);

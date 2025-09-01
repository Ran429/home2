export const BoardType = {
  NOTICE: {
    code: "NOTICE",
    text: "공지사항",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "KLEA 소식" },
      { href: "/board/notice", text: "공지사항" },
    ],
    href: "/board/notice",
    group: "krleaf_news",
  },
  RECRUIT: {
    code: "RECRUIT",
    text: "채용정보",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "KLEA 소식" },
      { href: "/board/recruit", text: "채용정보" },
    ],
    href: "/board/recruit",
    group: "krleaf_news",
  },
  BIDDING: {
    code: "BIDDING",
    text: "입찰공고",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "KLEA 소식" },
      { href: "/board/bidding", text: "입찰공고" },
    ],
    href: "/board/bidding",
    group: "krleaf_news",
  },
  GALLERY: {
    code: "GALLERY",
    text: "갤러리",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "KLEA 소식" },
      { href: "/board/gallery", text: "갤러리" },
    ],
    href: "/board/gallery",
    group: "krleaf_news",
  },
  INFO: {
    code: "INFO",
    text: "정보시스템",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "정보자료" },
      { href: "/info", text: "정보시스템" },
    ],
    href: "/info",
    group: "information",
  },
  LEGAL: {
    code: "LEGAL",
    text: "법령자료",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "정보자료" },
      { href: "/board/legal", text: "법령자료" },
    ],
    href: "/board/legal",
    group: "information",
  },
  PRESS: {
    code: "PRESS",
    text: "보도자료",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "정보자료" },
      { href: "/board/press", text: "보도자료" },
    ],
    href: "/board/press",
    group: "information",
  },
};

export const BoardTypes = [
  BoardType.NOTICE,
  BoardType.RECRUIT,
  BoardType.BIDDING,
  BoardType.GALLERY,
  BoardType.INFO,
  BoardType.LEGAL,
  BoardType.PRESS,
];

export type BoardType = (typeof BoardType)[keyof typeof BoardType];

export function isValidBoardType(boardTypeCode: string | undefined) {
  if (!boardTypeCode) return false;

  const exist = getBoardTypeEnum(boardTypeCode);
  return Boolean(exist);
}

export function getBoardTypeEnum(boardTypeCode: string) {
  return BoardTypes.find((it) => it.code === boardTypeCode);
}

export function getCommonBoardTypes(boardType: BoardType) {
  return BoardTypes.filter((it) => it.group === boardType.group);
}

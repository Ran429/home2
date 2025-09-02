// src/constants/board-type.ts

export const BoardType = {
  NOTICE: {
    code: "notice",
    text: "공지사항",
  },
  GALLERY: {
    code: "gallery",
    text: "갤러리",
  },
  RECRUIT: {
    code: "recruit",
    text: "채용공고",
  },
  BIDDING: {
    code: "bidding",
    text: "입찰공고",
  },
  LEGAL: {
    code: "legal",
    text: "법령정보",
  },
  PRESS: {
    code: "press",
    text: "보도자료",
  },
  INFO: {
    code: "info",
    text: "정보시스템",
  },
};

export const BoardTypes = [
  BoardType.NOTICE,
  BoardType.GALLERY,
  BoardType.RECRUIT,
  BoardType.BIDDING,
  BoardType.LEGAL,
  BoardType.PRESS,
  BoardType.INFO,
];

export function getBoardTypeEnum(code: string) {
  return BoardTypes.find((type) => type.code === code);
}
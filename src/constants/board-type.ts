// 기존 BoardType 객체 → BoardTypeMap 으로 변경
export const BoardTypeMap = {
  NOTICE: { code: "notice", text: "공지사항" },
  GALLERY: { code: "gallery", text: "갤러리" },
  RECRUIT: { code: "recruit", text: "채용공고" },
  BIDDING: { code: "bidding", text: "입찰공고" },
  LEGAL: { code: "legal", text: "법령정보" },
  PRESS: { code: "press", text: "보도자료" },
  INFO: { code: "info", text: "정보시스템" },
};

export const BoardTypes = [
  BoardTypeMap.NOTICE,
  BoardTypeMap.GALLERY,
  BoardTypeMap.RECRUIT,
  BoardTypeMap.BIDDING,
  BoardTypeMap.LEGAL,
  BoardTypeMap.PRESS,
  BoardTypeMap.INFO,
];

// ✅ 타입 정의
export type BoardType = (typeof BoardTypes)[number];

export function getBoardTypeEnum(code: string) {
  return BoardTypes.find((type) => type.code === code);
}
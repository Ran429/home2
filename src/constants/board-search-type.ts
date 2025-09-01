export const BoardSearchType = {
  ALL: {
    code: "all",
    text: "제목+내용",
  },
  TITLE: {
    code: "title",
    text: "제목",
  },
  CONTENT: {
    code: "content",
    text: "내용",
  },
};

export const BoardSearchTypes = [
  BoardSearchType.TITLE,
  BoardSearchType.CONTENT,
  BoardSearchType.ALL,
];

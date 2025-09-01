import { z } from "zod";

export const CreateBoardSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
  board_type: z.string().min(1, "게시판 타입을 선택하세요"),
  created_by: z.string().min(1, "작성자를 입력하세요"),
});

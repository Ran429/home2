import { z } from "zod";

export const UpdateBoardSchema = z.object({
  board_id: z.coerce.number({ required_error: "오류가 발생했습니다" }),
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
  delete_files: z.string().optional(),
  delete_imageFiles: z.string().optional(),
});

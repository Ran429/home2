import { z } from "zod";

export const CreateDepartmentSchema = z.object({
  name: z.string({ required_error: "이름을 입력해주세요" }),
  works: z.string({ required_error: "업무를 입력해주세요" }),
  sort_order: z.coerce.number({ required_error: "정렬순서를 입력해주세요" }),
});

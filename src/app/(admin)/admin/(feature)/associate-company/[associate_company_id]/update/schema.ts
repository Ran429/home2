import { z } from "zod";

export const UpdateAssociateCompanySchema = z.object({
  associate_company_id: z.coerce.number({
    required_error: "오류가 발생했습니다",
  }),
  description: z.string().optional(),
  link: z
    .string({ required_error: "링크를 입력해주세요" })
    .min(1, "링크를 입력해주세요"),
  sort_order: z.coerce.number({ required_error: "정렬순서를 입력해주세요" }),
  is_active: z.coerce.boolean({ required_error: "노출 상태를 입력해주세요" }),
});

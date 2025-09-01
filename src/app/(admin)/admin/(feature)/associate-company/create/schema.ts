import { z } from "zod";

export const CreateAssociateCompanySchema = z.object({
  description: z.string().optional(),
  link: z
    .string({ required_error: "링크를 입력해주세요" })
    .min(1, "링크를 입력해주세요"),
  sort_order: z.coerce.number({ required_error: "정렬순서를 입력해주세요" }),
});

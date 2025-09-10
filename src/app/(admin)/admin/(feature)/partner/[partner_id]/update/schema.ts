// update/schema.ts
import { z } from "zod";
export const UpdatePartnerSchema = z.object({
  partner_id: z.number().int(),
  name: z.string().min(1, "파트너 이름을 입력해주세요"),
  link: z.string().url("올바른 URL을 입력해주세요").optional(),
  description: z.string().optional(),
  sort_order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
});
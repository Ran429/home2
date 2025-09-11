// src/app/(root)/admin/partners/schema.ts
import { z } from "zod";

// 공통 스키마
export const PartnerSchema = z.object({
  partner_id: z.number().optional(), // update 시 필요
  name: z.string().min(1, "이름을 입력해주세요"),
  link: z.string().url("올바른 URL을 입력해주세요").optional(),
  description: z.string().optional(),
  sort_order: z.number().default(0),
  is_active: z.boolean().default(true),
});

// 생성용 (partner_id 필요 없음)
export const CreatePartnerSchema = PartnerSchema.omit({ partner_id: true });

// 수정용 (partner_id 필수)
export const UpdatePartnerSchema = PartnerSchema.extend({
  partner_id: z.number(),
});
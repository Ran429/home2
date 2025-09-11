// src/components/admin/auth/login/schema.ts
import { z } from "zod";

export const LoginSchema = z.object({
  userId: z.string().min(1, "아이디를 입력해주세요."),
  password: z.string().min(6, "비밀번호는 최소 6자리 이상이어야 합니다."),
});

export type LoginInput = z.infer<typeof LoginSchema>;
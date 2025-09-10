import { z } from "zod";

/**
 * 로그인 입력값 검증을 위한 Zod 스키마
 */
export const LoginSchema = z.object({
  userId: z.string().min(1, "사용자 ID를 입력해주세요."),
  email: z.string().email("유효한 이메일 형식이 아닙니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

export type LoginInput = z.infer<typeof LoginSchema>;
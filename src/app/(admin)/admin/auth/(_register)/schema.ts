import { prisma } from "@/server/prisma/prisma.client";
import { z } from "zod";

export const RegisterUserSchema = z
  .object({
    userId: z.string().trim().min(1, "아이디를 입력해주세요"),
    password: z.string().min(6, "비밀번호는 최소 6자리로 설정해주세요"),
    passwordConfirm: z.string().min(6, "비밀번호는 최소 6자리로 설정해주세요"),
    name: z.string().min(1, "이름을 입력해주세요"),
  })
  .refine(
    ({ password, passwordConfirm }) => {
      if (password !== passwordConfirm) {
        return false;
      }

      return true;
    },
    {
      path: ["passwordConfirm"],
      message: "비밀번호와 비밀번호 확인이 다릅니다",
    }
  )
  .refine(
    async ({ userId }) => {
      const exist = await prisma.adminAccount.findUnique({
        where: {
          userId,
        },
      });

      return !exist;
    },
    { path: ["userId"], message: "아이디가 중복되었습니다" }
  );

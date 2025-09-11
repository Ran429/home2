// src/app/api/admin/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma/prisma.client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { userId, password } = await req.json();

  const user = await prisma.adminAccount.findUnique({
    where: { userId },
  });

  if (!user) {
    return NextResponse.json({ success: false, message: "존재하지 않는 계정입니다." }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ success: false, message: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  // JWT 토큰 발급
  const token = jwt.sign(
    { id: user.id, userId: user.userId, name: user.name },
    process.env.JWT_SECRET!, // 반드시 .env 에 추가 필요
    { expiresIn: "1h" }
  );

  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1시간
  });

  return res;
}
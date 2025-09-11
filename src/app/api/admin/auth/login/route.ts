import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma/prisma.client";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: Request) {
  const { userId, password } = await req.json();

  const user = await prisma.adminAccount.findUnique({ where: { userId } });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "존재하지 않는 계정입니다." },
      { status: 401 }
    );
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json(
      { success: false, message: "비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  // ✅ jose로 JWT 발급
  const token = await new SignJWT({
    id: user.id,
    userId: user.userId,
    name: user.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);

  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });

  return res;
}
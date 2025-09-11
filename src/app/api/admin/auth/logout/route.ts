// src/app/api/admin/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // ✅ 로그인과 동일한 옵션으로 설정 + maxAge=0
  res.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return res;
}
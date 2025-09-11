// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      console.warn("❌ No admin_token found, redirecting...");
      return NextResponse.redirect(new URL("/admin/auth/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(token, secret);
      console.log("✅ JWT valid:", payload);
    } catch (e) {
      console.error("❌ JWT verification failed:", e);
      return NextResponse.redirect(new URL("/admin/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
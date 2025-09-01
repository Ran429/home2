import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/admin/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const isAdminPage = nextUrl.pathname.startsWith("/admin");
      const isAdminRegisterPage = nextUrl.pathname === "/admin/auth/register";

      if (!isAdminPage) {
        return true;
      }

      if (isAdminRegisterPage) {
        return true;
      }

      if (
        isLoggedIn &&
        (nextUrl.pathname === "/admin" ||
          nextUrl.pathname === "/admin/auth/login" ||
          nextUrl.pathname === "/admin/auth/register")
      ) {
        return NextResponse.redirect(new URL("/admin/board", nextUrl));
      }

      if (isLoggedIn && isAdminPage) {
        return true;
      }

      return false;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  session: {
    maxAge: 86400 * 7,
    updateAge: 86400,
  },
} satisfies NextAuthConfig;

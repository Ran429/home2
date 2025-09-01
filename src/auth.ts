import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { getAdminAccount } from "./server/prisma/admin-account.db";
import bcrypt from "bcrypt";
import { LoginSchema } from "./app/(admin)/admin/auth/login/schema";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const {
          data: { password, userId },
        } = validatedFields;

        const admin = await getAdminAccount(userId);
        if (!admin) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
          return null;
        }

        return {
          id: admin.id.toString(),
          name: admin.userId,
          email: admin.name,
        };
      },
    }),
  ],
});

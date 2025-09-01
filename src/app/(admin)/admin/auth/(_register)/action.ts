"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { RegisterUserSchema } from "./schema";
import { prisma } from "@/server/prisma/prisma.client";

type State = {
  message?: string;
};

export async function registerUser(
  prevState: State | null,
  formData: FormData
) {
  const validatedFields = await RegisterUserSchema.safeParseAsync(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten(),
      message: "Missing Fields. Failed to Register User.",
    };
  }

  const { name, userId, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.adminAccount.create({
    data: {
      userId,
      password: hashedPassword,
      name,
    },
  });

  redirect("/admin/auth/login");
}

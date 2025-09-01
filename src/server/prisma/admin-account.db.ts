import { prisma } from "./prisma.client";

export function getAdminAccount(userId: string) {
  return prisma.adminAccount.findUnique({
    where: {
      userId,
    },
  });
}

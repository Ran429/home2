import { DIALOG_TYPES } from "@/constants/dialog.const";
import { prisma } from "./prisma.client";

export const sleep = () => new Promise((resolve) => setTimeout(resolve, 5000));

export async function getDialogValues() {
  return prisma.config.findMany({
    where: {
      isActive: true,
      key: {
        in: DIALOG_TYPES.map((type) => type.code),
      },
    },
  });
}

export async function getConfigValue(key: string) {
  return prisma.config.findFirst({
    where: {
      isActive: true,
      key,
    },
  });
}

export async function updateConfigValue(key: string, content: string) {
  return prisma.$transaction(async (tx) => {
    await tx.config.updateMany({
      data: { isActive: false },
      where: {
        key,
        isActive: true,
      },
    });

    await tx.config.create({
      data: {
        key,
        value: content,
        isActive: true,
      },
    });
  });
}

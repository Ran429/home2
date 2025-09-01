import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

prismaClient.$on("query", (e) => {
  const isSlow = e.duration > 1000;
  const isDev = process.env.NODE_ENV === "development";

  if (isDev || isSlow) {
    if (e.query === "BEGIN") return;
    if (e.query === "DEALLOCATE ALL") return;
    if (e.query === "COMMIT") return;

    console.log(`
    Query: ${e.query}
    Params: ${e.params}
    Duration: ${e.duration}ms
    `);
  }
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || prismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { PrismaClient } from "@prisma/client";

const isProd = process.env.NODE_ENV === "production";

const logger = {
  debug: (...args: unknown[]) => {
    if (!isProd) console.debug(...args);
  },
};


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


    logger.debug(
      `\n    Query: ${e.query}\n    Params: ${e.params}\n    Duration: ${e.duration}ms\n    `,
    );
  }
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || prismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// src/server/prisma/single-page.db.ts
import { prisma } from "./prisma.client";

export async function getSinglePage(slug: string) {
  return prisma.singlePage.findUnique({
    where: { slug },
  });
}

export async function getAllSinglePages() {
  return prisma.singlePage.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export async function createSinglePage(data: {
  slug: string;
  title: string;
  content: string;
  metaDescription?: string;
}) {
  return prisma.singlePage.create({
    data,
  });
}

export async function updateSinglePage(slug: string, data: {
  title?: string;
  content?: string;
  metaDescription?: string;
  isActive?: boolean;
}) {
  return prisma.singlePage.update({
    where: { slug },
    data,
  });
}

export async function deleteSinglePage(slug: string) {
  // soft delete 대신 완전 삭제
  return prisma.singlePage.delete({
    where: { slug },
  });
}

const SinglePageDB = {
  getSinglePage,
  getAllSinglePages,
  createSinglePage,
  updateSinglePage,
  deleteSinglePage,
};

export default SinglePageDB;
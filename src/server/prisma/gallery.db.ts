import { prisma } from "./prisma.client";

export const GALLERY_SHOWING_COUNT = 4;

/**
 * 메인페이지에서 사용할 갤러리 아이템 로드
 */
export async function getMainGalleryItems() {
  return prisma.gallery.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      thumbnail: true,
      createdAt: true,
    },
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: GALLERY_SHOWING_COUNT,
  });
}

/**
 * 단일 갤러리 아이템 가져오기
 */
export async function getGalleryItem(id: number) {
  return prisma.gallery.findFirst({
    where: {
      id,
      isActive: true,
    },
  });
}

/**
 * 갤러리 목록 불러오기 (검색 + 페이징 지원)
 */
export async function getGalleryItems({
  page,
  galleryType,
  keyword,
  searchType,
}: {
  page: number;
  galleryType?: string;
  keyword?: string;
  searchType?: "title" | "description" | "all";
}) {
  const unit = 12;
  let searchCriteria: any = {};

  if (galleryType) {
    searchCriteria.galleryType = galleryType;
  }

  if (searchType && keyword) {
    switch (searchType) {
      case "title":
        searchCriteria.title = { contains: keyword };
        break;
      case "description":
        searchCriteria.description = { contains: keyword };
        break;
      case "all":
        searchCriteria.OR = [
          { title: { contains: keyword } },
          { description: { contains: keyword } },
        ];
        break;
    }
  }

  const galleryItems = await prisma.gallery.findMany({
    where: {
      ...searchCriteria,
      isActive: true,
    },
    skip: (page - 1) * unit,
    take: unit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalItemCount = await prisma.gallery.count({
    where: {
      ...searchCriteria,
      isActive: true,
    },
  });

  return {
    items: galleryItems,
    totalItemCount,
    totalPage: Math.ceil(totalItemCount / unit),
  };
}

/**
 * 갤러리 조회수 증가
 */
export async function updateGalleryViewCount(id: number) {
  await prisma.gallery.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });
}

/**
 * 갤러리 소프트 삭제
 */
export async function deleteGalleryItem(id: number) {
  return prisma.gallery.update({
    where: { id },
    data: { isActive: false },
  });
}

const GalleryDB = {
  getMainGalleryItems,
  getGalleryItem,
  getGalleryItems,
  updateGalleryViewCount,
  deleteGalleryItem,
};

export default GalleryDB;
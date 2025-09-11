import { getGalleryItems } from "@/server/prisma/gallery.db";
import { GalleryTypeMap } from "@/constants/gallery-type";
import BoardGallery from "@/components/board/BoardGallery";

export const metadata = {
  title: "출판물 및 보고서 - 인간취약성연구소",
};

export default async function PublicationsReportsPage({
  searchParams,
}: {
  searchParams?: { page?: string; keyword?: string; searchType?: string };
}) {
  const galleryType = GalleryTypeMap.PUBLICATIONS_REPORTS;
  const currentPage = Number(searchParams?.page) || 1;

  // searchType 안전하게 매핑
  let searchType: "title" | "description" | "all" | undefined;
  if (
    searchParams?.searchType === "title" ||
    searchParams?.searchType === "description" ||
    searchParams?.searchType === "all"
  ) {
    searchType = searchParams.searchType;
  }

  const items = await getGalleryItems({
    galleryType: galleryType.code,
    page: currentPage,
    keyword: searchParams?.keyword,
    searchType,
  });

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">{galleryType.text}</h1>

      <BoardGallery
        items={items.items}
        totalItemCount={items.totalItemCount}
        currentPage={currentPage}
        basePath="/achievements/publications-reports"
      />
    </div>
  );
}
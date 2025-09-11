import { getGalleryItems } from "@/server/prisma/gallery.db";
import { GalleryTypeMap } from "@/constants/gallery-type";
import BoardGallery from "@/components/board/BoardGallery";

export const metadata = {
  title: "미디어 보도 - 인간취약성연구소",
};

export default async function MediaCoveragePage({
  searchParams,
}: {
  searchParams?: { page?: string; keyword?: string; searchType?: string };
}) {
  const galleryType = GalleryTypeMap.MEDIA_COVERAGE;
  const currentPage = Number(searchParams?.page) || 1;

let searchType: "title" | "description" | "all" | undefined;
if (
  searchParams?.searchType === "title" ||
  searchParams?.searchType === "description" ||
  searchParams?.searchType === "all"
) {
  searchType = searchParams.searchType;
}

const items = await getGalleryItems({
  galleryType: GalleryTypeMap.MEDIA_COVERAGE.code,
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
        basePath="/achievements/media-coverage"
      />
    </div>
  );
}
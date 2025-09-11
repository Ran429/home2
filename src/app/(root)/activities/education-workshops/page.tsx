///Users/lovek/Documents/GitHub/home2/src/app/(root)/activities/education-workshops/page.tsx
import { getGalleryItems } from "@/server/prisma/gallery.db";
import { GalleryTypeMap } from "@/constants/gallery-type";
import { GalleryViewMap } from "@/constants/gallery-view-map";
import BoardGallery from "@/components/board/BoardGallery";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "교육 및 워크숍 - 인간취약성연구소",
};

export default async function EducationWorkshopsPage({
  searchParams,
}: {
  searchParams?: { page?: string; keyword?: string; searchType?: string };
}) {
  const galleryType = GalleryTypeMap.EDUCATION_WORKSHOPS;
  const currentPage = Number(searchParams?.page) || 1;

  // ✅ searchType 안전 처리
  const allowedSearchTypes = ["title", "description", "all"] as const;
  const searchType = allowedSearchTypes.includes(
    searchParams?.searchType as any
  )
    ? (searchParams?.searchType as typeof allowedSearchTypes[number])
    : undefined;

  // ✅ 갤러리 아이템 불러오기
  const items = await getGalleryItems({
    galleryType: galleryType.code,
    page: currentPage,
    keyword: searchParams?.keyword,
    searchType,
  });

  // ✅ 뷰타입 (지금은 무조건 gallery)
  const viewType = GalleryViewMap[galleryType.code];

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">{galleryType.text}</h1>

      {viewType === "gallery" && (
        <BoardGallery
          items={items.items}
          totalItemCount={items.totalItemCount}
          currentPage={currentPage}
          basePath="/activities/education-workshops"
        />
      )}
    </div>
  );
}
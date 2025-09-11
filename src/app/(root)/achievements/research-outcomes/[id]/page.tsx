import { notFound } from "next/navigation";
import { getGalleryItem } from "@/server/prisma/gallery.db";
import { GalleryTypeMap } from "@/constants/gallery-type";
import Image from "next/image";

export default async function ResearchOutcomesDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const galleryType = GalleryTypeMap.RESEARCH_OUTCOMES;
  const galleryId = Number(params.id);

  if (isNaN(galleryId)) {
    notFound();
  }

  // ✅ 갤러리 아이템 불러오기
  const item = await getGalleryItem(galleryId);
  if (!item || item.galleryType !== galleryType.code) {
    notFound();
  }

  return (
    <div className="container mx-auto py-16 px-4">
      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>

      {/* 날짜 */}
      <div className="text-sm text-gray-500 mb-6">
        {new Date(item.createdAt).toLocaleDateString()}
      </div>

      {/* 썸네일 */}
      {item.thumbnail && (
        <div className="mb-10">
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={800}
            height={500}
            className="rounded shadow-md w-full h-auto"
          />
        </div>
      )}

      {/* 설명 */}
      <p className="text-lg text-gray-700 leading-relaxed">{item.description}</p>
    </div>
  );
}
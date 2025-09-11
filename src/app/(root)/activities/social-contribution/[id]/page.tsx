import { notFound } from "next/navigation";
import { getBoardItem } from "@/server/prisma/board.db";
import { BoardTypeMap } from "@/constants/board-type";
import Image from "next/image";

export default async function SocialContributionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const boardType = BoardTypeMap.SOCIAL_CONTRIBUTION;
  const boardId = Number(params.id);

  if (isNaN(boardId)) {
    notFound();
  }

  // ✅ 게시판 아이템 불러오기
  const item = await getBoardItem(boardId);
  if (!item || item.boardType !== boardType.code) {
    notFound();
  }

  // ✅ images 캐스팅 (DB에는 Json[])
  const images = item.images as unknown as { url: string }[] | null;

  return (
    <div className="container mx-auto py-16 px-4">
      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>

      {/* 날짜 */}
      <div className="text-sm text-gray-500 mb-6">
        {new Date(item.createdAt).toLocaleDateString()}
      </div>

      {/* 대표 이미지 */}
      {images && images[0]?.url && (
        <div className="mb-10">
          <Image
            src={images?.[0]?.url ?? "/images/default-thumbnail.png"}
            alt={item.title}
            width={800}
            height={500}
            className="rounded shadow-md w-full h-auto"
          />
        </div>
      )}

      {/* 본문 */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
    </div>
  );
}
import { notFound } from "next/navigation";
import { getBoardItemWithPrevNext, updateViewCount } from "@/server/prisma/board.db";
import { BoardTypeMap } from "@/constants/board-type";
import Link from "next/link";
import Image from "next/image";

export default async function AnnouncementDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const boardType = BoardTypeMap.ANNOUNCEMENTS;
  const boardId = Number(params.id);

  if (isNaN(boardId)) {
    notFound();
  }

  // ✅ 조회수 증가
  await updateViewCount(boardId);

  // ✅ 게시글 + 이전/다음
  const result = await getBoardItemWithPrevNext(boardType.code, boardId);
  if (!result || !result.item) {
    notFound();
  }

  const { item, prevItem, nextItem } = result;

  // ✅ images 안전 캐스팅
  const images = (item.images as unknown as { url: string }[] | null) ?? [];

  return (
    <div className="container mx-auto py-16 px-4">
      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>

      {/* 작성자 + 날짜 */}
      <div className="text-sm text-gray-500 mb-6">
        <span>작성자: {item.createdBy || "관리자"}</span> ·{" "}
        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
      </div>

      {/* 본문 */}
      <div
        className="prose max-w-none mb-10"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />

      {/* 첨부 이미지 (대표 1개) */}
      {images.length > 0 && (
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

      {/* 이전/다음 글 */}
      <div className="flex justify-between border-t pt-4 text-sm">
        {prevItem ? (
          <Link href={`/events/announcements/${prevItem.id}`}>
            ⬅ {prevItem.title}
          </Link>
        ) : (
          <span />
        )}

        {nextItem ? (
          <Link href={`/events/announcements/${nextItem.id}`}>
            {nextItem.title} ➡
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
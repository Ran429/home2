// src/app/admin/gallery/page.tsx
import { prisma } from "@/server/prisma/prisma.client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminGalleryPage() {
  const galleries = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex-1 container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">갤러리 관리</h1>

      {/* ✅ 글 작성하기 버튼 */}
      <div className="flex justify-end mb-4">
        <Link href="/admin/gallery/create">
          <Button>글 작성하기</Button>
        </Link>
      </div>

      {/* ✅ 갤러리 목록 테이블 */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">번호</th>
            <th className="border border-gray-200 px-4 py-2">유형</th>
            <th className="border border-gray-200 px-4 py-2">제목</th>
            <th className="border border-gray-200 px-4 py-2">날짜</th>
            <th className="border border-gray-200 px-4 py-2">조회수</th>
          </tr>
        </thead>
        <tbody>
          {galleries.map((gallery, idx) => (
            <tr key={gallery.id}>
              <td className="border border-gray-200 px-4 py-2">
                {galleries.length - idx}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {gallery.galleryType}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <Link
                  href={`/admin/gallery/${gallery.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {gallery.title}
                </Link>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {new Date(gallery.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {gallery.viewCount}
              </td>
            </tr>
          ))}
          {galleries.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center text-gray-500 py-6 border border-gray-200"
              >
                게시물이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
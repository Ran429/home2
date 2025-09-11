"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// ✅ 갤러리 전용 타입
type GalleryItem = {
  id: number;
  title: string;
  description?: string | null;
  thumbnail?: string | null;
  createdAt: Date;
};

interface BoardGalleryProps {
  items: GalleryItem[];
  totalItemCount: number;
  currentPage: number;
  basePath?: string; // e.g. "/achievements/media-coverage"
  pageSize?: number;
}

export default function BoardGallery({
  items,
  totalItemCount,
  currentPage,
  basePath = "",
  pageSize = 9,
}: BoardGalleryProps) {
  const totalPages = Math.ceil(totalItemCount / pageSize);

  return (
    <div className="w-full space-y-8">
      {/* 📸 갤러리 목록 */}
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-12">게시물이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => {
            const thumbnail =
              item.thumbnail || "/images/default-thumbnail.png";

            return (
              <Link
                key={item.id}
                href={`${basePath}/${item.id}`}
                className="block group"
              >
                <div className="relative w-full h-56 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                  <Image
                    src={thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-3 font-medium text-lg text-gray-800 group-hover:text-hvri_primary line-clamp-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  {format(new Date(item.createdAt), "yyyy.MM.dd", { locale: ko })}
                </p>
              </Link>
            );
          })}
        </div>
      )}

      {/* ⏩ 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const query = new URLSearchParams(window.location.search);
                query.set("page", page.toString());
                window.location.href = `${basePath}?${query.toString()}`;
              }}
            >
              {page}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
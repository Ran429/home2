// src/components/main/recent-posts.tsx
import { prisma } from "@/server/prisma/prisma.client";
import { Board } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MENU_ITEMS } from "@/constants/menu"; // 메뉴 항목을 가져옴

/**
 * 게시물 하나를 표시하는 카드 컴포넌트
 */
function PostCard({ post }: { post: Post }) {
  // featuredImage에서 url 추출
  const getThumbnailUrl = () => {
    try {
      const imageData =
        typeof post.featuredImage === "string"
          ? JSON.parse(post.featuredImage)
          : post.featuredImage;
      if (imageData && typeof imageData.url === "string") {
        return imageData.url;
      }
    } catch (e) {
      console.error("Invalid featuredImage JSON:", e);
    }
    return "https://placehold.co/400x300/E2E8F0/4A5568?text=Image";
  };

  return (
    <Link href={`/${post.category}/${post.slug}`} className="block group">
      <div className="overflow-hidden rounded-lg border">
        <Image
          src={getThumbnailUrl()}
          alt={post.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-1">
        <h3 className="mt-4 text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
          {post.title}
        </h3>
        <p className="mt-2 text-gray-600 line-clamp-2 h-12">
          {post.content.slice(0, 80)}...
        </p>
      </div>
    </Link>
  );
}

/**
 * 특정 카테고리의 최신 게시물 목록을 표시하는 섹션 컴포넌트
 * ✅ 서버 컴포넌트로 동작 (Prisma 호출 안전)
 */
export default async function RecentPosts({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  const posts = await prisma.post.findMany({
    where: {
      category,
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  // 해당 카테고리의 "더보기" 링크
  const viewMoreLink =
    MENU_ITEMS.find((item) => item.href.includes(category))?.href || "#";

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        <Link
          href={viewMoreLink}
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          더보기 <ArrowRight className="ml-1 h-5 w-5" />
        </Link>
      </div>
      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-gray-50 flex items-center justify-center h-full">
          <p className="text-gray-500">게시물이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
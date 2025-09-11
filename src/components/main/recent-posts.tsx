// ❌ "use client"; 제거
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/server/prisma/prisma.client";
import { Board } from "@prisma/client";
import { MENU_ITEMS } from "@/constants/menu";

// ✅ Board 모델에 맞게 수정
function PostCard({ post }: { post: Board }) {
  const getThumbnailUrl = () => {
    try {
      if (Array.isArray(post.images) && post.images.length > 0) {
        const first = post.images[0] as any;
        if (first && typeof first.url === "string") {
          return first.url;
        }
      }
    } catch (e) {
      console.error("Invalid images JSON:", e);
    }
    return "https://placehold.co/400x300/E2E8F0/4A5568?text=No+Image";
  };

  return (
    <Link
      href={`/activities/${post.boardType}/${post.id}`}
      className="block group"
    >
      <div className="overflow-hidden rounded-lg border">
        <Image
          src={getThumbnailUrl() ?? "/images/default-thumbnail.png"}
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

export default async function RecentPosts({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  const posts: Board[] = await prisma.board.findMany({
    where: { boardType: category, isActive: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

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
// src/components/main/RecentBoardPosts.tsx
import { prisma } from "@/server/prisma/prisma.client";
import PostCard from "./PostCard";

export default async function RecentBoardPosts({
  title,
  category,
  viewMoreLink,
}: {
  title: string;
  category: string;
  viewMoreLink: string;
}) {
  const posts = await prisma.board.findMany({
    where: { boardType: category, isActive: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <section>
      <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        <a href={viewMoreLink} className="text-gray-600 hover:text-blue-600">
          더보기 →
        </a>
      </div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              imageUrl={(post.images as any)?.[0]?.url}
              href={`/activities/${post.boardType}/${post.id}`}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">게시물이 없습니다.</p>
      )}
    </section>
  );
}
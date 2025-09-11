// src/app/(root)/events/institute-events/[slug]/page.tsx
import { prisma } from "@/server/prisma/prisma.client";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function EventDetailPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <p className="text-sm text-gray-500 mt-6">
        작성자: {post.createdBy} | 등록일:{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
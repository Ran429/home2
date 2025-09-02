import { prisma } from "@/server/prisma/prisma.client";
import { notFound } from "next/navigation";

// 페이지 타이틀을 동적으로 설정합니다.
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, category: "introduction" }, // 수정
  });

  if (!post) {
    return {
      title: "페이지를 찾을 수 없음",
    };
  }

  return {
    title: `${post.title} | 인간취약성연구소`,
  };
}

export default async function IntroductionPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
      category: "introduction", // 수정
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="mb-8 pb-4 border-b">
        <h1 className="text-4xl font-extrabold text-gray-900">{post.title}</h1>
      </header>
      <div
        className="prose lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}

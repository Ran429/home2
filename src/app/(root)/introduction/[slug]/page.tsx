import { prisma } from "@/server/prisma/prisma.client";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

// 페이지 타이틀을 동적으로 설정합니다.
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const page = await prisma.singlePage.findUnique({
    where: { slug: params.slug },
  });

  if (!page) {
    return {
      title: "페이지를 찾을 수 없음",
    };
  }

  return {
    title: `${page.title} | 인간취약성연구소`,
    description: page.metaDescription ?? undefined,
  };
}

export default async function IntroductionPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = await prisma.singlePage.findUnique({
    where: { slug: params.slug },
  });

  if (!page) {
    notFound();
  }

  return (
    <article>
      <header className="mb-8 pb-4 border-b">
        <h1 className="text-4xl font-extrabold text-gray-900">{page.title}</h1>
      </header>
      <div
        className="prose lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </article>
  );
}
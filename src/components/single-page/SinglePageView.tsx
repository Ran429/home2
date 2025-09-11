import { prisma } from "@/server/prisma/prisma.client";
import { notFound } from "next/navigation";

export default async function SinglePageView({ slug }: { slug: string }) {
  const page = await prisma.singlePage.findUnique({ where: { slug } });

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      <div
        className="text-lg leading-relaxed text-gray-700"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}
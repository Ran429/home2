// src/app/(root)/partnerships/page.tsx
import { prisma } from "@/server/prisma/prisma.client";
import Image from "next/image";

export const metadata = { title: "파트너십 - 인간취약성연구소" };
export const dynamic = "force-dynamic";

export default async function PartnershipsPage() {
  const partners = await prisma.partner.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      <h1 className="text-3xl font-bold mb-6">파트너십</h1>
      <p className="text-lg leading-relaxed text-gray-700 mb-10">
        인간취약성연구소와 함께하는 협력사들입니다.
      </p>

      {/* ✅ 그리드 레이아웃 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {partners.map((partner) => {
          const logoUrl =
            typeof partner.logoImage === "string" && partner.logoImage.trim()
              ? partner.logoImage
              : "/images/default-logo.png"; // fallback

          return (
            <div
              key={partner.id}
              className="border border-gray-200 rounded-lg p-4 flex items-center justify-center bg-white shadow-sm hover:shadow-md transition"
            >
              <a
                href={partner.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src={logoUrl}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="object-contain border p-2"
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
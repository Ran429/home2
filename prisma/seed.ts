// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. 행사 (Events)
  await prisma.post.createMany({
    data: [
      {
        category: "events",
        slug: "institute-conference-2025",
        contentType: "Type2", // 리스트형
        title: "제1회 인간취약성 컨퍼런스 개최",
        content: "<p>2025년 8월 15일, 제1회 컨퍼런스가 열립니다.</p>",
        featuredImage: { url: "/images/sample/event1.jpg" },
        createdBy: "admin",
      },
      {
        category: "events",
        slug: "special-lecture-future-society",
        contentType: "Type2",
        title: "특별 초청 강연: 미래 사회와 인간",
        content: "<p>다가오는 2025년 8월 1일 특별 강연 안내</p>",
        featuredImage: { url: "/images/sample/event2.jpg" },
        createdBy: "admin",
      },
    ],
  });

  // 2. 주요활동 (Activities)
  await prisma.post.createMany({
    data: [
      {
        category: "activities",
        slug: "research-projects-ai-vulnerability",
        contentType: "Type2",
        title: "연구 프로젝트: AI와 인간 취약성",
        content: "<p>AI 시대의 인간 취약성 연구 프로젝트 소개</p>",
        featuredImage: { url: "/images/sample/activity1.jpg" },
        createdBy: "admin",
      },
      {
        category: "activities",
        slug: "workshop-digital-ethics",
        contentType: "Type2",
        title: "워크숍: 디지털 윤리와 사회",
        content: "<p>참여자 모집 안내</p>",
        featuredImage: { url: "/images/sample/activity2.jpg" },
        createdBy: "admin",
      },
    ],
  });

  // 3. 성과 (Achievements)
  await prisma.post.createMany({
    data: [
      {
        category: "achievements",
        slug: "research-paper-urban-isolation",
        contentType: "Type4", // 갤러리형
        title: "연구 보고서: 도시의 고립과 연결",
        content: "<p>2025년 8월 발간된 연구 보고서</p>",
        featuredImage: { url: "/images/sample/achievement1.jpg" },
        createdBy: "admin",
      },
      {
        category: "achievements",
        slug: "publication-digital-era-vulnerability",
        contentType: "Type4",
        title: "학술지 게재: 디지털 시대의 새로운 취약성",
        content: "<p>국제 저널에 게재된 연구 성과</p>",
        featuredImage: { url: "/images/sample/achievement2.jpg" },
        createdBy: "admin",
      },
    ],
  });

  console.log("✅ Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

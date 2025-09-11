// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // 1. 관리자 계정 생성
  const hashedPassword = await bcrypt.hash("admin1234", 10);

  await prisma.adminAccount.upsert({
    where: { userId: "admin" },
    update: {},
    create: {
      userId: "admin",
      password: hashedPassword,
      name: "관리자",
    },
  });

  // 2. 게시판 (Board)
// 2. 게시판 (Board)
await prisma.board.createMany({
  data: [
    {
      boardType: "institute-events",
      title: "제1회 인간취약성 컨퍼런스 개최",
      content: "<p>2025년 8월 15일, 제1회 컨퍼런스가 열립니다.</p>",
      images: [{ url: "/images/sample/event1.png" }],
      createdBy: "admin",
    },
    {
      boardType: "institute-events",
      title: "특별 초청 강연: 미래 사회와 인간",
      content: "<p>다가오는 2025년 8월 1일 특별 강연 안내</p>",
      images: [{ url: "/images/sample/event2.png" }],
      createdBy: "admin",
    },
    {
      boardType: "research-projects",
      title: "연구 프로젝트: AI와 인간 취약성",
      content: "<p>AI 시대의 인간 취약성 연구 프로젝트 소개</p>",
      images: [{ url: "/images/sample/activity1.png" }],
      createdBy: "admin",
    },
    {
      boardType: "social-contribution",
      title: "워크숍: 디지털 윤리와 사회",
      content: "<p>참여자 모집 안내</p>",
      images: [{ url: "/images/sample/activity2.png" }],
      createdBy: "admin",
    },
  ],
  skipDuplicates: true,
});

  // 3. 갤러리 (Gallery)
  await prisma.gallery.createMany({
    data: [
      {
        galleryType: "publications-reports",
        title: "연구 보고서: 도시의 고립과 연결",
        description: "2025년 8월 발간된 연구 보고서",
        thumbnail: "/images/sample/achievement1.png",
      },
      {
        galleryType: "media-coverage",
        title: "학술지 게재: 디지털 시대의 새로운 취약성",
        description: "국제 저널에 게재된 연구 성과",
        thumbnail: "/images/sample/achievement2.png",
      },
    ],
    skipDuplicates: true,
  });

  // 4. 단일 페이지 (SinglePage)
// 4. 단일 페이지 (SinglePage)
await prisma.singlePage.createMany({
  data: [
    {
      slug: "what-is-vulnerability",
      title: "인간취약성이란 - 인간취약성연구소",
      content: `
        <div class="container mx-auto py-16 px-4">
          <h1 class="text-3xl font-bold mb-6">인간취약성이란</h1>
          <p class="text-lg leading-relaxed text-gray-700 mb-4">
            인간은 누구나 다양한 차원에서 취약성을 가지고 있습니다...
          </p>
          <div class="bg-gray-100 border-l-4 border-hvri_primary p-4 text-center text-gray-800 my-6">
            “취약성을 이해하는 것은 인간을 이해하는 첫걸음이다.”
          </div>
        </div>
      `,
    },
    {
      slug: "history-and-philosophy",
      title: "연구소의 연혁과 철학 - 인간취약성연구소",
      content: `
        <div class="container mx-auto py-16 px-4">
          <h1 class="text-3xl font-bold mb-6">연구소의 연혁과 철학</h1>
          <p class="text-lg leading-relaxed text-gray-700">
            인간취약성연구소는 설립 이래 다양한 연구와 사회적 활동을 통해...
          </p>
        </div>
      `,
    },
    {
      slug: "at-a-glance",
      title: "연구소 한눈에 보기 - 인간취약성연구소",
      content: `
        <div class="container mx-auto py-16 px-4">
          <h1 class="text-3xl font-bold mb-6">연구소 한눈에 보기</h1>
          <p class="text-lg leading-relaxed text-gray-700">
            연구소의 전체 개요를 보여주는 페이지...
          </p>
        </div>
      `,
    },
    {
      slug: "people",
      title: "함께하는 이들 - 인간취약성연구소",
      content: `
        <div class="container mx-auto py-16 px-4">
          <h1 class="text-3xl font-bold mb-6">함께하는 이들</h1>
          <p class="text-lg leading-relaxed text-gray-700">
            연구소의 조직 구조 및 운영 체계를 설명...
          </p>
        </div>
      `,
    },
    {
      slug: "ethics-charter",
      title: "윤리 및 운영 헌장 - 인간취약성연구소",
      content: `
        <div class="container mx-auto py-16 px-4">
          <h1 class="text-3xl font-bold mb-6">윤리 및 운영 헌장</h1>
          <p class="text-lg leading-relaxed text-gray-700">
            연구소의 윤리적 원칙과 헌장 내용을 서술...
          </p>
        </div>
      `,
    },
  ],
  skipDuplicates: true,
});
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
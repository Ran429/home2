// This is the new main page for the Institute for Human Vulnerability.

import RecentPosts from "@/components/main/recent-posts";
import MainCarousel from "@/components/main/carousel/main-carousel";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* 1. Main Banner Section → 캐러셀로 교체 */}
      <MainCarousel />

      {/* 2. Recent Posts Section */}
      <main className="container mx-auto py-16 px-4 space-y-16">
        <RecentPosts title="연구소 행사" category="events" />
        <RecentPosts title="교육 및 워크숍" category="activities" />
        <RecentPosts title="연구성과" category="achievements" />
      </main>
    </div>
  );
}
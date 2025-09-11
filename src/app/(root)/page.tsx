import MainCarousel from "@/components/main/carousel/main-carousel";
import RecentBoardPosts from "@/components/main/RecentBoardPosts";
import RecentGalleryPosts from "@/components/main/RecentGalleryPosts";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <MainCarousel />
      <main className="container mx-auto py-16 px-4 space-y-16">
        <RecentBoardPosts
          title="연구소 행사"
          category="institute-events"
          viewMoreLink="/events/institute-events"
        />
        <RecentGalleryPosts
          title="교육 및 워크숍"
          category="education-workshops"
          viewMoreLink="/activities/education-workshops"
        />
        <RecentBoardPosts
          title="연구성과"
          category="research-projects"
          viewMoreLink="/activities/research-projects"
        />
      </main>
    </div>
  );
}
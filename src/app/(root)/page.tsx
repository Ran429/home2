// This is the new main page for the Human Vulnerability Research Institute.

import RecentPosts from "@/components/main/recent-posts";

export const dynamic = "force-dynamic";


export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* 1. Main Banner Section */}
      <section className="w-full h-[60vh] bg-gray-200 flex items-center justify-center">
        {/* Replace with a background image */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-800">인간취약성연구소</h1>
          <p className="mt-4 text-lg text-gray-600">
            Institute for Human Vulnerability
          </p>
        </div>
      </section>

      {/* 2. Recent Posts Section */}
      <main className="container mx-auto py-16 px-4 space-y-16">
        <RecentPosts 
          title="연구소 행사"
          category="events"
        />

        <RecentPosts 
          title="교육 및 워크숍"
          category="activities"
        />

        <RecentPosts 
          title="연구성과"
          category="achievements"
        />
      </main>
    </div>
  );
}

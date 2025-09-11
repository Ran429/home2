// src/app/(root)/layout.tsx
import NavBar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import ScrollButton from "@/components/common/scroll-button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex flex-col relative">
      {/* 일반 사용자 네비게이션 */}
      <NavBar />

      {/* 본문 */}
      {children}

      {/* 공통 UI */}
      <ScrollButton />
      <Footer />
    </main>
  );
}
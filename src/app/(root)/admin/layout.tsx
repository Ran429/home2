// src/app/(root)/admin/layout.tsx
import AdminNavbar from "@/components/admin/common/admin-navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col relative">
      {/* 상단 관리자 네비게이션 */}
      <AdminNavbar />

      {/* ✅ 네비게이션 높이만큼 여백을 줘서 겹침 방지 */}
        <main className="flex-1 pt-[100px] container mx-auto px-4">
        {children}
      </main>
    </div>
  );
}
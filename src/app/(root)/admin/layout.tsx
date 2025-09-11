// src/app/(root)/admin/layout.tsx
import AdminNavbar from "@/components/admin/common/admin-navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 상단 관리자 네비게이션 (fixed 처리) */}
      <AdminNavbar />

      {/* ✅ 네비게이션 높이(예: 64px)만큼 여백 */}
      <main className="flex-1 mt-16 container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
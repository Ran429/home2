"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AdminNavbar() {
  const pathname = usePathname();

  const adminMenu = [
    { text: "단일 페이지 수정", href: "/admin/pages" },
    { text: "게시판 글 관리", href: "/admin/posts" },
    { text: "갤러리 글 관리", href: "/admin/gallery" },
    { text: "협력사십 관리", href: "/admin/partners" },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    window.location.href = "/admin/auth/login";
  };

  return (
    <nav className="top-0 w-full z-20 fixed bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between h-[64px] px-4">
        {/* 로고/타이틀 */}
        <Link
          href="/admin"
          className="text-xl font-bold text-hvri_primary hover:opacity-70"
        >
          인간취약성연구소 관리자
        </Link>

        {/* 탭 메뉴 */}
        <ul className="flex flex-row gap-8 text-lg">
          {adminMenu.map(({ text, href }) => (
            <li key={text}>
              <Link
                href={href}
                className={cn(
                  "transition-colors border-b-2 border-transparent pb-1",
                  pathname.startsWith(href)
                    ? "text-hvri_primary border-hvri_primary font-semibold"
                    : "hover:text-hvri_primary"
                )}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>

        {/* 로그아웃 버튼 */}
        <Button
          variant="destructive"
          size="sm"
          onClick={handleLogout}
          className="ml-6"
        >
          로그아웃
        </Button>
      </div>
    </nav>
  );
}
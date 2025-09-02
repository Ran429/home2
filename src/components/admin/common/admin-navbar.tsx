// src/components/admin/common/admin-navbar.tsx

"use client";

import useScrollHeight from "@/hooks/use-scroll-height";
import { FONT_PRETENDARD } from "@/lib/font-util";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavBar() {
  const { isTop } = useScrollHeight();
  const pathname = usePathname();

  const adminMenu = [
    { text: "콘텐츠 관리", href: "/admin/posts?page=1", group: "/admin/posts" },
    {
      text: "파트너 관리",
      href: "/admin/partners",
      group: "/admin/partners",
    },
    { text: "회원 관리", href: "/admin/members", group: "/admin/members" },
    {
      text: "사이트 설정",
      href: "/admin/settings",
      group: "/admin/settings",
    },
  ];

  return (
    <nav
      className={cn(
        FONT_PRETENDARD,
        "top-0 w-full text-black z-20 fixed",
        "h-[100px] bg-white px-4",
        isTop ? "backdrop-blur" : "!bg-white shadow-md"
      )}
    >
      <div className="container font-bold flex flex-row items-center justify-center h-full">
        <Link
          className={cn(
            "flex-none mr-auto hover:opacity-50 active:opacity-50 transition-opacity flex justify-center items-center",
            "text-2xl text-hvri_primary"
          )}
          href="/admin/posts"
        >
          인간취약성연구소 관리자
        </Link>

        <ul className="flex flex-row gap-8 justify-center text-lg z-20">
          {adminMenu.map(({ text, href, group }) => (
            <li key={text}>
              <Link
                href={href}
                className={cn(
                  "transition-colors border-b-2 border-transparent",
                  "hover:text-hvri_primary hover:border-hvri_primary py-[38px]",
                  pathname.startsWith(group)
                    ? "text-hvri_primary border-hvri_primary border-b-[3px]"
                    : ""
                )}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
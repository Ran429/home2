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
    { text: "게시물 관리", href: "/admin/board?page=1", group: "/admin/board" },
    {
      text: "연관사이트 관리",
      href: "/admin/associate-company",
      group: "/admin/associate-company",
    },
    { text: "사이트 관리", href: "/admin/site", group: "/admin/site" },
    {
      text: "조직도 관리",
      href: "/admin/organization/department",
      group: "/admin/organization",
    },
    {
      text: "유지보수 현황",
      href: "/admin/maintenance",
      group: "/admin/maintenance",
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
            "text-2xl text-klea_text_primary"
          )}
          href="/admin/board"
        >
          한국지방교육행정연구재단 관리자
        </Link>

        <ul className="flex flex-row gap-8 justify-center text-lg z-20">
          {adminMenu.map(({ text, href, group }) => (
            <li key={text}>
              <Link
                href={href}
                className={cn(
                  "transition-colors border-b-2 border-transparent",
                  "hover:text-klea_text_primary hover:border-klea_text_primary py-[38px]",
                  pathname.startsWith(group)
                    ? "text-klea_text_primary border-klea_text_primary"
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

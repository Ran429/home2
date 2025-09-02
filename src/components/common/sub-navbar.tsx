"use client";

import { NavItem } from "@/constants/menu";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubNavbarProps {
  // 현재 상위 메뉴 정보를 받습니다 (예: '소개' 메뉴 객체)
  currentMenu: NavItem | undefined;
}

export default function SubNavbar({ currentMenu }: SubNavbarProps) {
  const pathname = usePathname();

  if (!currentMenu || !currentMenu.subItems) {
    return null; // 서브메뉴가 없으면 아무것도 표시하지 않음
  }

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 pr-8">
      <h2 className="text-3xl font-bold border-b-2 border-gray-800 pb-4 mb-4">
        {currentMenu.label}
      </h2>
      <nav>
        <ul>
          {currentMenu.subItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex justify-between items-center w-full px-4 py-3 my-1 rounded-md transition-colors duration-200",
                  pathname === item.href
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span>{item.label}</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}


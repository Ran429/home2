"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MENU_ITEMS } from "@/constants/menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PcMenu() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-x-10">
      {MENU_ITEMS.map((menuItem) => (
        <li key={menuItem.href}>
          {menuItem.subItems ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "text-lg font-semibold transition-colors hover:text-hvri_primary focus:outline-none",
                  pathname.startsWith(menuItem.href)
                    ? "text-hvri_primary"
                    : "text-gray-700"
                )}
              >
                {menuItem.label}
              </DropdownMenuTrigger>
                  <DropdownMenuContent
                  sideOffset={8}
                  align="start"
                  className="mt-2 w-64 rounded-xl shadow-2xl border border-gray-200 bg-white p-3"
                >
                  {menuItem.subItems.map((subItem) => (
                    <DropdownMenuItem
                      key={subItem.href}
                      asChild
                      className="px-4 py-3 text-gray-700 text-base rounded-md hover:bg-hvri_primary hover:text-white transition-colors cursor-pointer"
                    >
                      <Link href={subItem.href}>{subItem.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href={menuItem.href}
              className={cn(
                "text-lg font-semibold transition-colors hover:text-hvri_primary",
                pathname.startsWith(menuItem.href)
                  ? "text-hvri_primary"
                  : "text-gray-700"
              )}
            >
              {menuItem.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
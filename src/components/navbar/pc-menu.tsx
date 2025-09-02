"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MENU_ITEMS, NavItem } from "@/constants/menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Renders the menu items for the desktop view, including dropdowns for sub-menus.
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
                  "text-lg font-semibold transition-colors hover:text-blue-600 focus:outline-none",
                  pathname.startsWith(menuItem.href)
                    ? "text-blue-600"
                    : "text-gray-700"
                )}
              >
                {menuItem.label}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2">
                {menuItem.subItems.map((subItem) => (
                  <DropdownMenuItem key={subItem.href} asChild>
                    <Link href={subItem.href}>{subItem.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href={menuItem.href}
              className={cn(
                "text-lg font-semibold transition-colors hover:text-blue-600",
                pathname.startsWith(menuItem.href)
                  ? "text-blue-600"
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

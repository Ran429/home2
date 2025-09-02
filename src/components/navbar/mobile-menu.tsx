"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MENU_ITEMS } from "../../constants/menu";
import Link from "next/link";

// Renders the menu items in a slide-out panel for the mobile view, using an accordion for sub-menus.
export default function MobileMenu() {
  return (
    <div className="flex flex-col h-full p-4">
      <Link href="/" className="font-bold text-xl text-gray-800 mb-8">
        인간취약성연구소
      </Link>
      <nav className="flex-1">
        <Accordion type="multiple" className="w-full">
          {MENU_ITEMS.map((menuItem) =>
            menuItem.subItems ? (
              <AccordionItem key={menuItem.href} value={menuItem.href}>
                <AccordionTrigger className="text-lg font-semibold">
                  {menuItem.label}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="pl-4">
                    {menuItem.subItems.map((subItem) => (
                      <li key={subItem.href} className="py-2">
                        <Link
                          href={subItem.href}
                          className="text-gray-600 hover:text-blue-600"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <Link
                key={menuItem.href}
                href={menuItem.href}
                className="block py-4 text-lg font-semibold border-b"
              >
                {menuItem.label}
              </Link>
            )
          )}
        </Accordion>
      </nav>
    </div>
  );
}


"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MENU_ITEMS, NavItem } from "@/constants/menu";
import { cn } from "@/lib/utils";
import { Menu as MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// --- Custom Hook: useWindowSize ---
// Determines if the current window size is for PC or mobile.
function useWindowSize() {
  const [isPc, setIsPc] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      // Using 1024px as the breakpoint for PC view (lg in Tailwind)
      setIsPc(window.innerWidth >= 1024);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isPc };
}

// --- Mobile Menu Component ---
function MobileMenu() {
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
                        <Link href={subItem.href} className="text-gray-600 hover:text-blue-600">
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

// --- Mobile Navbar ---
function MobileNavbar() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 h-[60px] bg-white/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto flex justify-between items-center h-full px-4">
        <Link href="/" className="font-bold text-lg text-gray-800">
          인간취약성연구소
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2">
              <MenuIcon className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <MobileMenu />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

// --- PC Menu Component ---
function PcMenu() {
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

// --- PC Navbar ---
function PcNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "w-full fixed top-0 left-0 z-50 transition-all duration-300",
        isScrolled || !pathname.startsWith("/introduction")
          ? "bg-white/80 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center h-[70px]">
        <Link href="/" className="font-bold text-xl text-gray-800">
          인간취약성연구소
        </Link>
        <nav>
          <PcMenu />
        </nav>
      </div>
    </header>
  );
}

// --- Main NavBar Component (Wrapper) ---
// This is the final exported component.
export default function NavBar() {
  const { isPc } = useWindowSize();

  // Render a placeholder header until the client-side hook determines the screen size.
  if (isPc === undefined) {
    return <header className="w-full h-[70px] bg-white" />;
  }

  // Render the appropriate navbar based on the screen size.
  return isPc ? <PcNavbar /> : <MobileNavbar />;
}


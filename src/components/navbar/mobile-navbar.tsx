"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu as MenuIcon } from "lucide-react";
import MobileMenu from "./mobile-menu"; // ✅ import 해서 사용

export default function MobileNavbar() {
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

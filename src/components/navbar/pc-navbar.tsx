// src/components/navbar/pc-navbar.tsx

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PcMenu from "./pc-menu"; // ✅ import 해서 사용

export default function PcNavbar() {
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
        <Link href="/" className="font-bold text-xl text-hvri_primary">
          인간취약성연구소
        </Link>
        <nav>
          <PcMenu />
        </nav>
      </div>
    </header>
  );
}
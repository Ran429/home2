"use client";

import { useEffect, useState } from "react";

export default function useScrollHeight() {
  const [scrollHeight, setScrollHeight] = useState<number>();

  useEffect(() => {
    function handleScroll() {
      setScrollHeight(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    scrollHeight,
    isTop: scrollHeight === undefined || scrollHeight <= 0,
  };
}

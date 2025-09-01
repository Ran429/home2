"use client";

import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import Divider from "./divider";

export default function ScrollButton() {
  function scrollTo(height: number) {
    if (typeof window === "undefined") return;

    window.scrollTo({ top: height, behavior: "smooth" });
  }

  return (
    <div
      className={cn(
        "fixed bottom-20 z-20 right-9 flex flex-col bg-white rounded-2xl",
        "border-klea_box_border border-[0.8px] shadow-lg"
      )}
    >
      <button
        className={cn("p-3 lg:p-4", HOVER_CLASSNAME)}
        onClick={() => {
          scrollTo(0);
        }}
      >
        <ArrowUpIcon className="w-5 h-6" />
      </button>
      <Divider className="self-center !w-1/2 !bg-klea_box_border" />
      <button
        className={cn("p-3 lg:p-4", HOVER_CLASSNAME)}
        onClick={() => {
          scrollTo(9999);
        }}
      >
        <ArrowDownIcon className="w-5 h-6" />
      </button>
    </div>
  );
}

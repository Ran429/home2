"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import deleteBoardAction from "./delete-action";

type Props = {
  boardId: number;
};

export default function AdminMaintenanceBoardDetailButtons({ boardId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    setLoading(true);
    try {
      await deleteBoardAction(boardId);
      alert("정상적으로 삭제되었습니다");
      router.push("/admin/maintenance?page=1");
    } catch (e) {
      alert("오류가 발생했습니다");
      console.error("Error Occurred in deleteBoard", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex justify-center mt-12 lg:mt-[71px] gap-5">
      <Link
        href={`/admin/maintenance/${boardId}/update`}
        className={cn(
          "text-center w-full lg:w-auto px-28 bg-white py-4",
          "rounded-md lg:rounded-[30px] border-yellow-500 border", // border
          "font-bold text-xl text-yellow-500", // font
          "hover:opacity-50 active:opacity-50 transition-opacity"
        )}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm">
            처리 중 입니다
          </span>
        ) : (
          "수정"
        )}
      </Link>
      <button
        onClick={() => handleDelete()}
        className={cn(
          "text-center w-full lg:w-auto px-28 bg-white py-4",
          "rounded-md lg:rounded-[30px] border border-red-500", // border
          "font-bold text-xl text-red-500", // font
          "hover:opacity-50 active:opacity-50 transition-opacity"
        )}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm">
            처리 중 입니다
          </span>
        ) : (
          "삭제"
        )}
      </button>
      <button
        onClick={() => router.push("/admin/maintenance")}
        className={cn(
          "text-center w-full lg:w-auto px-28 bg-white py-4",
          "rounded-md lg:rounded-[30px] border-klea_text_primary border", // border
          "font-bold text-xl text-klea_text_primary", // font
          "hover:opacity-50 active:opacity-50 transition-opacity"
        )}
      >
        목록
      </button>
    </div>
  );
}

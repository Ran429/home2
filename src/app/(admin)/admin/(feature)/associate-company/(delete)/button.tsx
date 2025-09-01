"use client";

import { useState } from "react";
import { deleteAssociateCompanyAction } from "./action";
import { cn } from "@/lib/utils";

type Props = {
  entityId: number;
};

export default function DeleteAssociateCompanyButton({ entityId }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    if (!confirm("정말 삭제하시겠습니까?")) {
      setLoading(false);
      return;
    }

    try {
      deleteAssociateCompanyAction(entityId);
    } catch (e) {
      alert("오류가 발생했습니다");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className={cn(
        "daisy-btn daisy-btn-error text-white",
        loading ? "daisy-btn-disabled" : ""
      )}
      onClick={handleDelete}
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm">
          처리 중 입니다
        </span>
      ) : (
        "삭제"
      )}
    </button>
  );
}

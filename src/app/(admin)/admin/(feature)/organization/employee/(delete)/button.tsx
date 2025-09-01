"use client";

import { useState } from "react";
import { deleteEmployeeAction } from "./action";

type Props = {
  employeeId: number;
};

export default function DeleteEmployeeButton({ employeeId }: Props) {
  const [loading, setLoading] = useState(false);

  async function deleteEmployee() {
    setLoading(true);
    if (!confirm("정말 삭제하시겠습니까?")) {
      setLoading(false);
      return;
    }

    try {
      deleteEmployeeAction(employeeId);
      alert("정상적으로 삭제되었습니다");
    } catch (e) {
      alert("오류가 발생했습니다");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className="daisy-btn daisy-btn-error text-white"
      onClick={deleteEmployee}
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

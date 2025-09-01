"use client";

import AdminInput from "@/components/admin/admin-input";
import ReplyItem from "@/components/admin/maintenance/reply-item";
import Divider from "@/components/common/divider";
import { AdminMaintenanceBoardReplyType } from "@/server/prisma/admin-maintenance-board-reply.db";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import createReplyAction from "@/server/action/create-reply.action";

type Props = {
  replies: AdminMaintenanceBoardReplyType[];
  boardId: number;
  loginUserId: number;
};

export default function AdminMaintenanceBoardReplyList({
  replies,
  boardId,
  loginUserId,
}: Props) {
  const replyInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleReplyAdd() {
    const inputValue = replyInputRef.current?.value;
    if (!inputValue || inputValue === "") {
      alert("내용을 입력해주세요");
      replyInputRef?.current?.focus();
      return;
    }

    setLoading(true);
    const response = await createReplyAction({ boardId, content: inputValue });
    if (!response.ok) {
      alert("오류가 발생했습니다 : " + response.message);
      console.error("Error Occurred on replyAdd: ", response.error);
    } else {
      replyInputRef.current.value = "";
      router.refresh();
    }
    setLoading(false);
  }
  return (
    <>
      <div className="flex flex-col py-5">
        <div className="flex flex-row gap-10 items-center">
          <span className="font-medium text-base">댓글목록</span>
          <div className="flex flex-1 w-full flex-col">
            {replies.map((reply) => (
              <ReplyItem
                reply={reply}
                key={reply.id}
                isMe={loginUserId === reply.createdUser.id}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-row gap-3 justify-center items-center">
          <AdminInput
            inputRef={replyInputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleReplyAdd();
              }
            }}
          />
          <button
            className="daisy-btn daisy-btn-primary"
            onClick={handleReplyAdd}
            disabled={loading}
          >
            {loading ? "잠시만 기다려주세요" : "저장"}
          </button>
        </div>
      </div>
      <Divider className="!bg-[#E5E5E5]" />
    </>
  );
}

"use client";

import deleteReplyAction from "@/server/action/delete-reply.action";
import { yyyymmddhhmmss } from "@/lib/time-util";
import { cn } from "@/lib/utils";
import { AdminMaintenanceBoardReplyType } from "@/server/prisma/admin-maintenance-board-reply.db";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import AdminInput from "../admin-input";
import updateReplyAction from "@/server/action/update-reply.action";

type Props = {
  reply: AdminMaintenanceBoardReplyType;

  /**
   * 해당 댓글이 내 댓글인지 여부
   */
  isMe: boolean;
};

export default function ReplyItem({ reply, isMe }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  async function handleDelete() {
    if (!isMe) return;

    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    setLoading(true);
    const response = await deleteReplyAction(reply.id);
    if (!response.ok) {
      alert("오류가 발생했습니다 : " + response.message);
      console.error("Error Occured on deleteReply : ", response.error);
      return;
    } else {
      alert("삭제되었습니다");
      router.refresh();
    }

    setLoading(false);
  }

  async function handleEditSave() {
    if (!isMe) return;

    const updateContentValue = editInputRef.current?.value;
    if (!updateContentValue || updateContentValue === "") {
      alert("내용을 입력해주세요");
      editInputRef.current?.focus();
      return;
    }

    if (!confirm("저장하시겠습니까?")) {
      return;
    }

    setLoading(true);
    const response = await updateReplyAction(reply.id, updateContentValue);
    if (!response.ok) {
      alert("오류가 발생했습니다 : " + response.message);
      console.error("Error Occured on deleteReply : ", response.error);
      return;
    } else {
      alert("저장되었습니다");
      setEditable(false);
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <div
      className={cn(
        "daisy-chat mt-5",
        isMe ? "daisy-chat-end" : "daisy-chat-start"
      )}
    >
      <div className="daisy-chat-image daisy-avatar">
        <div className="w-10 rounded-full bg-gray-300 !flex justify-center items-center text-white">
          {reply.createdUser.name.substring(0, 1)}
        </div>
      </div>
      <div className="daisy-chat-header">
        {reply.createdUser.name}{" "}
        <time className="text-xs opacity-50">
          {yyyymmddhhmmss(reply.updatedAt)}
        </time>
      </div>
      <div className="daisy-chat-bubble">
        {editable ? (
          <AdminInput
            type="text"
            defaultValue={reply.content}
            className="daisy-input daisy-input-bordered text-black w-full max-w-md"
            inputRef={editInputRef}
          />
        ) : (
          reply.content
        )}
      </div>

      {isMe && (
        <div className="flex flex-row gap-3 mt-3">
          {!editable ? (
            <>
              <button
                className="daisy-btn daisy-btn-sm daisy-btn-secondary"
                disabled={loading}
                onClick={() => setEditable(true)}
              >
                수정
              </button>

              <button
                className="daisy-btn daisy-btn-sm daisy-btn-error text-white"
                onClick={handleDelete}
                disabled={loading}
              >
                삭제
              </button>
            </>
          ) : (
            <>
              <button
                className="daisy-btn daisy-btn-sm daisy-btn-secondary"
                disabled={loading}
                onClick={handleEditSave}
              >
                수정 내용 저장
              </button>
              <button
                className="daisy-btn daisy-btn-sm"
                disabled={loading}
                onClick={() => setEditable(false)}
              >
                수정 취소
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

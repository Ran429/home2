"use client";

import AdminEditor from "@/components/admin/admin-editor";
import { Config } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { updateConfigValueAction } from "./action";
import { Editor as TinyMCEEditor } from "tinymce";

type Props = {
  configValue: Config;
};

export default function UpdateDialogForm({ configValue }: Props) {
  const editorRef = useRef<TinyMCEEditor | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function save() {
    setLoading(true);

    if (!editorRef.current) return;

    const content = editorRef.current.getContent();
    if (!content || content === "") {
      alert("본문을 입력해주세요");
      return;
    }

    try {
      await updateConfigValueAction(configValue.key, content);
      alert("성공적으로 저장되었습니다.");
      router.push("/admin/site");
    } catch (e) {
      alert("오류가 발생했습니다.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 w-full">
      <AdminEditor editorRef={editorRef} initialValue={configValue.value} />

      <div className="mt-10 w-full flex justify-center items-center gap-5">
        <Link
          className="daisy-btn daisy-btn-outline daisy-btn-lg"
          href="/admin/site"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm">
              저장 중 입니다...
            </span>
          ) : (
            "뒤로"
          )}
        </Link>

        <button
          className="daisy-btn daisy-btn-primary daisy-btn-lg"
          onClick={save}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm">
              저장 중 입니다...
            </span>
          ) : (
            "저장"
          )}
        </button>
      </div>
    </div>
  );
}

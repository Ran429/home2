"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import type { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

// ✅ Quill 불러오기
const ReactQuill = dynamic<ReactQuillProps>(() => import("react-quill"), { ssr: false });

export default function AdminPageEditor() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      const res = await fetch(`/api/admin/pages/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    };
    fetchPage();
  }, [slug]);

  const handleSave = async () => {
    const res = await fetch(`/api/admin/pages/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert("✅ 저장되었습니다!");
      router.push("/admin/pages");
    } else {
      alert("❌ 저장 실패");
    }
  };

  if (loading) return <p>로딩 중...</p>;

// ✅ Supabase Storage 업로드 핸들러
const imageHandler = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    if (!input.files?.length) return;
    const file = input.files[0];

    // 👉 여기에 Supabase 업로드 API 호출
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const { url } = await res.json();

      // Quill에 이미지 삽입
      const quill = (window as any).quillRef;
      const range = quill.getSelection();
      quill.insertEmbed(range.index, "image", url);
    } else {
      alert("❌ 이미지 업로드 실패");
    }
  };
};

  // ✅ 툴바 설정
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], 
        [{ header: [1, 2, 3, false] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"], 
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">단일 페이지 수정</h1>

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />

      {/* ✅ Quill Editor */}
      <div className="bg-white border rounded-md shadow p-2">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
        />
      </div>

      <Button onClick={handleSave} className="mt-4">
        저장하기
      </Button>
    </div>
  );
}
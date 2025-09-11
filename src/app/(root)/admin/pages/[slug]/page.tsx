"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
      router.push("/admin/pages"); // 목록 페이지로 이동
    } else {
      alert("❌ 저장 실패");
    }
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">단일 페이지 수정</h1>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
      />
      <Button onClick={handleSave}>저장하기</Button>
    </div>
  );
}
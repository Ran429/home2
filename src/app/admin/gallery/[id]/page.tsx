"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminGalleryEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [galleryType, setGalleryType] = useState("education-workshops");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await fetch(`/api/admin/gallery/${id}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description ?? "");
        setGalleryType(data.galleryType);
      }
      setLoading(false);
    };
    if (id) fetchGallery();
  }, [id]);

  const handleSave = async () => {
    const res = await fetch(`/api/admin/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, galleryType }),
    });

    if (res.ok) {
      alert("✅ 수정되었습니다!");
      router.push("/admin/gallery");
    } else {
      alert("❌ 수정 실패");
    }
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">갤러리 수정</h1>

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />

      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        placeholder="설명"
      />

      <label className="block text-sm font-medium mt-4 mb-2">유형</label>
      <select
        value={galleryType}
        onChange={(e) => setGalleryType(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="education-workshops">교육 및 워크숍</option>
        <option value="publications-reports">출판물/보고서</option>
        <option value="media-coverage">언론 보도</option>
      </select>

      <Button onClick={handleSave} className="mt-4">
        저장하기
      </Button>
    </div>
  );
}
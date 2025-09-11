"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AdminGalleryCreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [galleryType, setGalleryType] = useState("education-workshops");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("galleryType", galleryType);
      if (files) {
        Array.from(files).forEach((file) => {
          formData.append("files", file);
        });
      }

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("❌ 저장 실패");

      alert("✅ 갤러리가 추가되었습니다!");
      router.push("/admin/gallery");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">갤러리 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />

        {/* ✅ 갤러리 타입 선택 */}
        <select
          value={galleryType}
          onChange={(e) => setGalleryType(e.target.value)}
          className="border rounded px-3 py-2"
          required
        >
          <option value="education-workshops">교육 및 워크숍</option>
          <option value="publications-reports">출판물 및 보고서</option>
          <option value="media-coverage">언론 보도</option>
        </select>

        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <p className="text-sm text-gray-500">
          첫 번째 이미지가 썸네일로 사용됩니다.
        </p>
        <Button type="submit" disabled={loading}>
          {loading ? "저장 중..." : "저장하기"}
        </Button>
      </form>
    </div>
  );
}
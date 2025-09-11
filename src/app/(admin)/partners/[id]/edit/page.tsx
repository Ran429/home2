"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminPartnerCreatePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      alert("협력사 이름을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      let logoUrls: string[] = [];

      // ✅ 로고 여러 개 업로드
      if (logoFiles.length > 0) {
        const formData = new FormData();
        logoFiles.forEach((file) => formData.append("files", file));

        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("❌ 로고 업로드 실패");
        }

        const { urls } = await uploadRes.json();
        logoUrls = urls;
      }

      // ✅ 협력사 정보 저장
      const res = await fetch("/api/admin/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          logos: logoUrls,
        }),
      });

      if (!res.ok) {
        throw new Error("❌ 저장 실패");
      }

      alert("✅ 파트너가 추가되었습니다!");
      router.push("/admin/partners");
    } catch (err: any) {
      alert(err.message || "에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">협력사 등록</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 협력사 이름 */}
        <Input
          placeholder="협력사 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* 협력사 설명 */}
        <Textarea
          placeholder="협력사 설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />

        {/* 로고 업로드 */}
        <div>
          <label className="block text-sm font-medium mb-2">로고 업로드</label>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setLogoFiles(Array.from(e.target.files || []))}
          />
        </div>

        {/* 저장 버튼 */}
        <Button type="submit" disabled={loading}>
          {loading ? "저장 중..." : "저장하기"}
        </Button>
      </form>
    </div>
  );
}
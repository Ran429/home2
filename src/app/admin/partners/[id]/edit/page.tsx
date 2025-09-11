"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminPartnerEditPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ 기존 데이터 불러오기
  useEffect(() => {
    const fetchPartner = async () => {
      const res = await fetch(`/api/admin/partners/${id}`);
      if (res.ok) {
        const data = await res.json();
        setName(data.name || "");
        setDescription(data.description || "");
      }
    };
    if (id) fetchPartner();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert("협력사 이름을 입력해주세요.");
      return;
    }
    setLoading(true);

    try {
      let logoUrls: string[] = [];

      // ✅ 로고 업로드
      if (logoFiles.length > 0) {
        const formData = new FormData();
        logoFiles.forEach((file) => formData.append("files", file));

        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("❌ 로고 업로드 실패");

        const { urls } = await uploadRes.json();
        logoUrls = urls;
      }

      // ✅ 수정 API 호출 (PUT)
      const res = await fetch(`/api/admin/partners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          logos: logoUrls.length > 0 ? logoUrls : undefined, // 새 로고 업로드 없으면 유지
        }),
      });

      if (!res.ok) throw new Error("❌ 저장 실패");

      alert("✅ 파트너가 수정되었습니다!");
      router.push("/admin/partners");
    } catch (err: any) {
      alert(err.message || "에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">협력사 수정</h1>

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
          <label className="block text-sm font-medium mb-2">로고 업로드 (새 로고 업로드 시 교체됨)</label>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setLogoFiles(Array.from(e.target.files || []))}
          />
        </div>

        {/* 저장 버튼 */}
        <Button type="submit" disabled={loading}>
          {loading ? "저장 중..." : "수정하기"}
        </Button>
      </form>
    </div>
  );
}
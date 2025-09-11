"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminPartnerCreatePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name) {
      alert("협력사 이름을 입력해주세요.");
      return;
    }

    setLoading(true);

    let logoUrl: string | null = null;

    if (logoFile) {
      const formData = new FormData();
      formData.append("file", logoFile);

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (uploadRes.ok) {
        const { url } = await uploadRes.json();
        logoUrl = url;
      } else {
        alert("❌ 로고 업로드 실패");
        setLoading(false);
        return;
      }
    }

    const res = await fetch("/api/admin/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        logo: logoUrl,
      }),
    });

    if (res.ok) {
      alert("✅ 파트너가 추가되었습니다!");
      router.push("/admin/partners");
    } else {
      alert("❌ 저장 실패");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">협력사 등록</h1>

      <Input
        placeholder="협력사 이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Textarea
        placeholder="협력사 설명"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
      />

      <div>
        <label className="block text-sm font-medium mb-2">로고 업로드</label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
        />
      </div>

      <Button onClick={handleSave} disabled={loading}>
        {loading ? "저장 중..." : "저장하기"}
      </Button>
    </div>
  );
}
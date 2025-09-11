"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function AdminPartnerEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ 기존 데이터 불러오기
  useEffect(() => {
    const fetchPartner = async () => {
      const res = await fetch(`/api/admin/partners/${id}`);
      if (res.ok) {
        const data = await res.json();
        setName(data.name);
        setDescription(data.description || "");
        setLogoUrl(data.logo || null);
      }
      setLoading(false);
    };
    fetchPartner();
  }, [id]);

  const handleSave = async () => {
    if (!name) {
      alert("협력사 이름을 입력해주세요.");
      return;
    }

    setLoading(true);

    let uploadedLogoUrl = logoUrl;

    if (logoFile) {
      const formData = new FormData();
      formData.append("file", logoFile);

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (uploadRes.ok) {
        const { url } = await uploadRes.json();
        uploadedLogoUrl = url;
      } else {
        alert("❌ 로고 업로드 실패");
        setLoading(false);
        return;
      }
    }

    const res = await fetch(`/api/admin/partners/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        logo: uploadedLogoUrl,
      }),
    });

    if (res.ok) {
      alert("✅ 협력사 정보가 수정되었습니다!");
      router.push("/admin/partners");
    } else {
      alert("❌ 수정 실패");
    }

    setLoading(false);
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">협력사 수정</h1>

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
        <label className="block text-sm font-medium mb-2">현재 로고</label>
        {logoUrl ? (
         <Image
                src={logoUrl}
                alt="협력사 로고"
                width={128}
                height={128}
                className="object-contain border mb-2"
                />
        ) : (
          <p className="text-gray-500">등록된 로고가 없습니다.</p>
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
        />
      </div>

      <Button onClick={handleSave} disabled={loading}>
        {loading ? "저장 중..." : "수정하기"}
      </Button>
    </div>
  );
}
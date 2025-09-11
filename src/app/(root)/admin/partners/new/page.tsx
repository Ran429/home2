"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewPartnerPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/admin/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        logoImage: { url: logoUrl },
        link,
        description,
      }),
    });

    setLoading(false);
    router.push("/admin/partners");
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">파트너 추가</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <Input placeholder="파트너 이름" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input placeholder="로고 이미지 URL" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
        <Input placeholder="홈페이지 링크" value={link} onChange={(e) => setLink(e.target.value)} />
        <Textarea placeholder="설명" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button type="submit" disabled={loading}>
          {loading ? "등록 중..." : "등록하기"}
        </Button>
      </form>
    </div>
  );
}
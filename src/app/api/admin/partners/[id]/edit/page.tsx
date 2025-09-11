"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditPartnerPage() {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPartner() {
      const res = await fetch(`/api/admin/partners/${id}`);
      const data = await res.json();
      setName(data.name);
      setLink(data.link || "");
      setDescription(data.description || "");
      setLoading(false);
    }
    fetchPartner();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/admin/partners/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, link, description }),
    });
    alert("협력사 정보가 수정되었습니다!");
    router.push("/admin/partners");
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">협력사 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
        <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="링크" />
        <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="설명" />
        <Button type="submit">수정하기</Button>
      </form>
    </div>
  );
}
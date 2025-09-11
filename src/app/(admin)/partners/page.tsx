"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Partner = {
  id: number;
  name: string;
  link?: string;
  description?: string;
};

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  // ✅ 협력사 목록 로드
  const fetchPartners = async () => {
    const res = await fetch("/api/admin/partners");
    const data = await res.json();
    setPartners(data);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // ✅ 등록
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, link, description }),
    });
    setName("");
    setLink("");
    setDescription("");
    fetchPartners();
  };

  // ✅ 삭제
  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await fetch(`/api/admin/partners/${id}`, { method: "DELETE" });
    fetchPartners();
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">협력사 관리</h1>

      {/* 등록 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <Input
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          placeholder="링크"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Input
          placeholder="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">등록하기</Button>
      </form>

      {/* 목록 */}
      <ul className="space-y-4">
        {partners.map((partner) => (
          <li
            key={partner.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{partner.name}</h2>
              <p className="text-sm text-gray-500">{partner.description}</p>
              {partner.link && (
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm"
                >
                  {partner.link}
                </a>
              )}
            </div>
            <div className="flex gap-2">
              {/* 수정 버튼 */}
              <Link href={`/admin/partners/${partner.id}/edit`}>
                <Button variant="outline">수정</Button>
              </Link>

              {/* 삭제 버튼 */}
              <Button
                variant="destructive"
                onClick={() => handleDelete(partner.id)}
              >
                삭제
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
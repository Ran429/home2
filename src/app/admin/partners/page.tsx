"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // ✅ 추가


type Partner = {
  id: number;
  name: string;
  link?: string;
  description?: string;
  logoImage?: string[]; // ✅ Supabase 업로드 URL 배열
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
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <li
            key={partner.id}
            className="p-4 border rounded bg-white shadow flex flex-col items-center text-center"
          >
            {/* ✅ 로고 이미지 */}
            {partner.logoImage && partner.logoImage.length > 0 && (
              <Image
                src={partner.logoImage[0]}
                alt={`${partner.name} 로고`}
                fill
                className="object-contain"
              />
            )}

            <h2 className="font-semibold">{partner.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{partner.description}</p>
            {partner.link && (
              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm mb-2"
              >
                {partner.link}
              </a>
            )}

            <div className="flex gap-2">
              <Link href={`/admin/partners/${partner.id}/edit`}>
                <Button variant="outline">수정</Button>
              </Link>
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
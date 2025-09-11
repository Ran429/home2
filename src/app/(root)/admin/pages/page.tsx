"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPagesList() {
  const [pages, setPages] = useState<any[]>([]);
  const [filteredPages, setFilteredPages] = useState<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("all");

  useEffect(() => {
    const fetchPages = async () => {
      const res = await fetch("/api/admin/pages");
      if (res.ok) {
        const data = await res.json();
        setPages(data);
        setFilteredPages(data); // 초기값은 전체
      }
    };
    fetchPages();
  }, []);

  // slug 선택 시 필터링
  const handleFilter = (slug: string) => {
    setSelectedSlug(slug);
    if (slug === "all") {
      setFilteredPages(pages);
    } else {
      setFilteredPages(pages.filter((page) => page.slug === slug));
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">단일 페이지 관리</h1>

      {/* ✅ slug 드롭다운 */}
      <div className="mb-6">
        <label className="mr-2 font-medium">Slug 선택:</label>
        <select
          value={selectedSlug}
          onChange={(e) => handleFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="all">전체</option>
          {pages.map((page) => (
            <option key={page.id} value={page.slug}>
              {page.slug}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ 필터링된 목록 */}
      <ul className="space-y-2">
        {filteredPages.map((page) => (
          <li key={page.id} className="p-4 border rounded-md bg-white shadow">
            <Link href={`/admin/pages/${page.slug}`}>
              <span className="font-medium">{page.title}</span>{" "}
              <span className="text-gray-500 text-sm">({page.slug})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
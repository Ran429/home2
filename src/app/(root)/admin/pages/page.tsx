"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPagesList() {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      const res = await fetch("/api/admin/pages");
      if (res.ok) {
        setPages(await res.json());
      }
    };
    fetchPages();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">단일 페이지 관리</h1>
      <ul className="space-y-2">
        {pages.map((page) => (
          <li key={page.id} className="p-4 border rounded-md bg-white shadow">
            <Link href={`/admin/pages/${page.slug}`}>
              {page.title} ({page.slug})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
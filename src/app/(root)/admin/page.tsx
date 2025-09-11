// src/app/(root)/admin/page.tsx
import Link from "next/link";

const adminMenu = [
  {
    text: "단일 페이지 수정",
    href: "/admin/pages",
    description: "소개 / 윤리헌장 / 한눈에 보기 등",
  },
  {
    text: "게시판 글 관리",
    href: "/admin/posts",
    description: "행사·소식 / 주요활동 / 성과 (리스트형)",
  },
  {
    text: "갤러리 글 관리",
    href: "/admin/gallery",
    description: "교육·워크숍 / 출판물 / 미디어 보도",
  },
  {
    text: "파트너십 관리",
    href: "/admin/partners",
    description: "협력기관 및 파트너 관리",
  },
];

export default function AdminPage() {
  return (
    <main className="flex-1 container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">관리자 페이지</h1>
      <p className="text-gray-600 mb-8">
        여기서 글 작성/수정/삭제 등을 할 수 있습니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminMenu.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="p-6 border rounded-lg shadow hover:shadow-md transition bg-white"
          >
            <h2 className="text-lg font-semibold">{menu.text}</h2>
            <p className="text-gray-500 text-sm mt-2">{menu.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
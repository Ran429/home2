import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">관리자 대시보드</h1>
      <p className="text-gray-600 mb-8">
        연구소 콘텐츠를 관리할 수 있는 영역입니다. 원하는 기능을 선택하세요.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/pages" className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold">📄 단일 페이지 수정</h2>
          <p className="text-gray-500">연구소 소개, 역사, 철학 등 단일 페이지 콘텐츠 관리</p>
        </Link>

        <Link href="/admin/activities" className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold">📝 게시판 형태 수정</h2>
          <p className="text-gray-500">연구소 행사, 프로젝트, 사회공헌 활동 등 게시판형 콘텐츠 관리</p>
        </Link>

        <Link href="/admin/gallery" className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold">🖼 갤러리 형태 수정</h2>
          <p className="text-gray-500">교육·워크숍, 출판물, 미디어 보도 등 갤러리형 콘텐츠 관리</p>
        </Link>

        <Link href="/admin/partners" className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold">🤝 파트너십 게시판 수정</h2>
          <p className="text-gray-500">협력사 및 파트너 정보를 등록·수정</p>
        </Link>
      </div>
    </div>
  );
}
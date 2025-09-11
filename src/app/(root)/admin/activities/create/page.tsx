"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminNewActivityPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardType, setBoardType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!boardType) {
      alert("게시판을 선택하세요!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("boardType", boardType);
    if (file) formData.append("file", file);

    // ✅ list형 vs gallery형 API 분리
    const apiUrl = boardType === "education-workshops" || boardType === "publications-reports" || boardType === "media-coverage"
      ? "/api/admin/gallery"
      : "/api/admin/list";

    const res = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("게시글이 등록되었습니다!");
      router.push("/admin/activities"); // 작성 후 목록으로 이동
    } else {
      alert("등록 실패 😢");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">새 글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 */}
        <Input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* 내용 */}
        <Textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />

        {/* 게시판 선택 */}
        <Select value={boardType} onValueChange={setBoardType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="게시판 선택" />
          </SelectTrigger>
          <SelectContent>
            {/* 리스트형 */}
            <SelectItem value="institute-events">연구소 행사</SelectItem>
            <SelectItem value="announcements">연구소 공시·공고</SelectItem>
            <SelectItem value="research-projects">연구 프로젝트</SelectItem>
            <SelectItem value="social-contribution">사회공헌활동</SelectItem>
            <SelectItem value="research-outcomes">연구성과</SelectItem>

            {/* 갤러리형 */}
            <SelectItem value="education-workshops">교육 및 워크숍</SelectItem>
            <SelectItem value="publications-reports">출판물 및 보고서</SelectItem>
            <SelectItem value="media-coverage">미디어 보도</SelectItem>
          </SelectContent>
        </Select>

        {/* 파일 업로드 */}
<Input
  type="file"
  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] ?? null)
  }
/>
        <Button type="submit" disabled={loading}>
          {loading ? "등록 중..." : "등록하기"}
        </Button>
      </form>
    </div>
  );
}
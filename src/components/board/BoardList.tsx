"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation"; // ✅ 추가

type BoardItem = {
  id: number;
  title: string;
  createdAt: Date;
  createdBy: string | null; // ✅ null 허용
  viewCount?: number;
};

interface BoardListProps {
  items: BoardItem[];
  totalItemCount: number;
  currentPage: number;
  basePath?: string; // e.g. "/events/institute-events"
  pageSize?: number;
}

export default function BoardList({
  items,
  totalItemCount,
  currentPage,
  basePath = "",
  pageSize = 10,
}: BoardListProps) {
  const [searchType, setSearchType] = useState("title");
  const [keyword, setKeyword] = useState("");

  const totalPages = Math.ceil(totalItemCount / pageSize);

  const router = useRouter(); // ✅ 라우터
  const searchParams = useSearchParams(); // ✅ 현재 query 가져오기

  return (
    <div className="w-full space-y-6">
      {/* 🔍 검색 영역 */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-end">
        <Select value={searchType} onValueChange={setSearchType}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="검색 구분" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">제목</SelectItem>
            <SelectItem value="content">내용</SelectItem>
            <SelectItem value="all">제목+내용</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full md:w-64"
        />
        <Button
          onClick={() => {
            const query = new URLSearchParams();
            if (keyword) query.set("keyword", keyword);
            if (searchType) query.set("searchType", searchType);
            query.set("page", "1"); // 검색하면 항상 첫 페이지로 이동
            router.push(`${basePath}?${query.toString()}`); // ✅ 안전 이동
          }}
        >
          검색
        </Button>
      </div>

      {/* 📋 게시판 테이블 */}
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-12">게시물이 없습니다.</p>
      ) : (
        <div className="border rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-20 text-center">번호</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="w-40 text-center">작성자</TableHead>
                <TableHead className="w-32 text-center">등록일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="text-center">
                    {totalItemCount - (currentPage - 1) * pageSize - index}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`${basePath}/${item.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.createdBy ?? "관리자"} {/* ✅ null 안전 처리 */}
                  </TableCell>
                  <TableCell className="text-center text-gray-500">
                    {format(new Date(item.createdAt), "yyyy.MM.dd", {
                      locale: ko,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ⏩ 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const query = new URLSearchParams(searchParams.toString());
                query.set("page", page.toString());
                router.push(`${basePath}?${query.toString()}`); // ✅ 안전 이동
              }}
            >
              {page}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
import Paging from "@/components/common/paging";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { Board } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";

const POSTS_PER_PAGE = 10; // 페이지 당 보여줄 게시글 수

export default async function ActivityListPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page || 1);

 const totalPosts = await prisma.board.count({
  where: { boardType: params.category, isActive: true },
});

const posts = await prisma.board.findMany({
  where: {
    boardType: params.category, // ✅ category → boardType
    isActive: true,             // ✅ 활성 데이터만
  },
  orderBy: {
    createdAt: "desc",
  },
  skip: (currentPage - 1) * POSTS_PER_PAGE,
  take: POSTS_PER_PAGE,
});

  if (posts.length === 0 && totalPosts > 0) {
    notFound(); // 게시물은 있는데 해당 페이지에 결과가 없으면 404
  }

  return (
    <div>
      <header className="mb-8 pb-4 border-b">
        <h1 className="text-4xl font-extrabold text-gray-900 capitalize">
          {params.category.replace("-", " ")}
        </h1>
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">번호</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className="w-[150px]">작성일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post: Board, index: number) => (
            <TableRow key={post.id}>
              <TableCell>
                {totalPosts - (currentPage - 1) * POSTS_PER_PAGE - index}
              </TableCell>
              <TableCell className="font-medium">
                <Link
                  href={`/activities/${params.category}/${post.id}`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </TableCell>
              <TableCell>
                {dayjs(post.createdAt).format("YYYY-MM-DD")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {posts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          게시물이 없습니다.
        </div>
      )}

      <div className="mt-8">
        <Paging
          currentPage={currentPage}
          totalPage={Math.ceil(totalPosts / POSTS_PER_PAGE)} // ✅ 전체 페이지 수
          baseUrl={`/activities/${params.category}`}        // ✅ 기본 URL
        />
      </div>
    </div>
  );
}


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BoardType, getBoardTypeEnum } from "@/constants/board-type";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { yyyymmdd } from "@/lib/time-util";
import { cn } from "@/lib/utils";
import { BoardListItem } from "@/server/prisma/board.db";
import Link from "next/link";

type Props = {
  items: BoardListItem[];
  currentPage: number;
  totalItemCount: number;
};

export default function AdminActivitiesTable({
  items,
  currentPage,
  totalItemCount,
}: Props) {
  return (
    <Table className="mt-10">
      <colgroup>
        <col width="10%" />
        <col width="10%" />
        <col width="" />
        <col width="10%" />
        <col width="10%" />
        <col width="15%" />
        <col width="10%" />
      </colgroup>
      <TableHeader>
        <TableRow
          className={cn(
            "*:bg-[#E2E9FF] *:outline *:outline-1 *:outline-[#EEEEEE] *:text-center *:font-bold *:text-black *:text-[18px]"
          )}
        >
          <TableHead className="!border-l-0">번호</TableHead>
          <TableHead>게시판유형</TableHead>
          <TableHead>제목</TableHead>
          <TableHead>첨부파일</TableHead>
          <TableHead>작성자</TableHead>
          <TableHead>날짜</TableHead>
          <TableHead className="!border-r-0">조회</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.length > 0 ? (
          items.map((item, i) => (
            <TableRow key={i} className={cn("*:border *:border-[#EEEEEE]")}>
              <TableCell className="text-center !border-l-0">
                <span className="text-[15px] lg:text-[17px]">
                  {totalItemCount - i - (currentPage - 1) * 10}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className="inline-block text-[15px] lg:text-[17px]">
                  {getBoardTypeEnum(item.boardType)?.text}
                </span>
              </TableCell>
              <TableCell>
                <Link
                  href={`/admin/board/${item.id}`}
                  className={cn(
                    HOVER_CLASSNAME,
                    "max-w-full inline-block text-ellipsis whitespace-nowrap overflow-hidden text-hvri_primary hover:underline",
                    "text-[15px] lg:text-[17px]"
                  )}
                >
                  {item.title}
                </Link>
              </TableCell>
              <TableCell className="text-center">
                {item.files && (
                  <span
                    className={cn(
                      "text-sm font-medium lg:text-base text-[#777777]",
                      "border-2 border-gray-300 rounded-[5px]",
                      "px-4 py-[0.3rem] inline-block"
                    )}
                  >
                    첨부파일
                  </span>
                )}
              </TableCell>
              <TableCell className="text-center">
                <span className="inline-block text-[15px] lg:text-[17px]">
                  {item.createdBy}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className="inline-block text-[15px] lg:text-[17px] min-w-24">
                  {yyyymmdd(item.createdAt)}
                </span>
              </TableCell>
              <TableCell className="text-center !border-r-0">
                <span className="text-[15px] lg:text-[17px]">
                  {item.viewCount}
                </span>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center border-b border-[#EEEEEE] py-8"
            >
              <span className="text-base">아직 작성된 글이 없습니다.</span>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
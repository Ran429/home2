import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { yyyymmdd } from "@/lib/time-util";
import { cn } from "@/lib/utils";
import { AdminMaintenanceBoardListItem } from "@/server/prisma/admin-maintenance-board.db";
import Link from "next/link";

type Props = {
  items: AdminMaintenanceBoardListItem[];
  currentPage: number;
  totalItemCount: number;
};

export default function AdminMaintenanceBoardTable({
  items,
  currentPage,
  totalItemCount,
}: Props) {
  return (
    <Table className="mt-10">
      <colgroup>
        <col width="10%" />
        <col width="" />
        <col width="10%" />
        <col width="10%" />
        <col width="15%" />
      </colgroup>
      <TableHeader>
        <TableRow
          className={cn(
            "*:bg-[#E2E9FF] *:outline *:outline-1 *:outline-[#EEEEEE] *:text-center *:font-bold *:text-black *:text-[18px]"
          )}
        >
          <TableHead className="!border-l-0">번호</TableHead>
          <TableHead>제목</TableHead>
          <TableHead>첨부파일</TableHead>
          <TableHead>작성자</TableHead>
          <TableHead>날짜</TableHead>
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

              <TableCell>
                <Link
                  href={`/admin/maintenance/${item.id}`}
                  className={cn(
                    HOVER_CLASSNAME,
                    "max-w-full inline-block text-ellipsis whitespace-nowrap overflow-hidden text-[#2149A6] hover:underline",
                    "text-[15px] lg:text-[17px]"
                  )}
                >
                  {item.title}{" "}
                  {item._count.replies > 0 && `[${item._count.replies}]`}
                </Link>
              </TableCell>
              <TableCell className="text-center">
                {item.files && (
                  <span
                    className={cn(
                      "text-sm font-medium lg:text-base text-[#777777]",
                      "border-2 border-klea_box_border rounded-[5px]",
                      "px-4 py-[0.3rem] inline-block"
                    )}
                  >
                    첨부파일
                  </span>
                )}
              </TableCell>
              <TableCell className="text-center">
                <span className="inline-block text-[15px] lg:text-[17px]">
                  {item.createdUser.name}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className="inline-block text-[15px] lg:text-[17px] min-w-24">
                  {yyyymmdd(item.createdAt)}
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

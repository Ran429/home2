import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BoardType } from "@/constants/board-type";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { yyyymmdd } from "@/lib/time-util";
import { cn } from "@/lib/utils";
import { SearchBoard } from "@/server/prisma/board.db";
import Link from "next/link";

type Props = {
  boardType: BoardType;
  items: SearchBoard[];
};

export default function SearchBoardTable({ items, boardType }: Props) {
  return (
    <Table className="mt-9">
      <colgroup>
        <col width="25%" />
        <col width="" />
        <col width="15%" />
      </colgroup>
      <TableHeader>
        <TableRow
          className={cn(
            "*:bg-[#F7F8FB] *:outline *:outline-1 *:outline-[#EEEEEE] *:text-center *:font-bold *:text-black *:text-[18px]"
          )}
        >
          <TableHead className="!border-l-0">제목</TableHead>
          <TableHead>내용</TableHead>
          <TableHead className="!border-r-0">작성시간 </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.length > 0 ? (
          items.map((item, i) => (
            <TableRow key={i} className={cn("*:border *:border-[#EEEEEE]")}>
              <TableCell className="text-center">
                <Link
                  href={`${boardType.href}/${item.id}`}
                  className={cn(
                    HOVER_CLASSNAME,
                    "font-bold text-[#333333] hover:underline",
                    "text-[15px] lg:text-[17px]"
                  )}
                >
                  {item.title}
                </Link>
              </TableCell>
              <TableCell>
                <div
                  className="text-center text-[#333333] font-normal text-[15px] lg:text-[17px] max-h-[80px] overflow-hidden text-ellipsis whitespace-nowrap"
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}
                />
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
              colSpan={3}
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

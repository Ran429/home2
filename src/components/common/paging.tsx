"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

type Props = {
  totalPage: number;
  currentPage: number;
  baseUrl: string;
};

export default function Paging({ currentPage, totalPage, baseUrl }: Props) {
  const searchParmas = useSearchParams();

  const pageUnit = 10;
  const startPage = Math.floor(currentPage / pageUnit) * pageUnit;
  const pages = Array(10)
    .fill(undefined)
    .map((_, index) => startPage + index + 1)
    .filter((page) => page <= totalPage);

  function getSearchParamsWithoutPage() {
    const urlSearchParams = new URLSearchParams(searchParmas);
    urlSearchParams.delete("page");
    return urlSearchParams.toString();
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* 첫 번째로 */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              href={`${baseUrl}?${getSearchParamsWithoutPage()}&page=0`}
            >
              <ArrowLeft className="size-4" />
            </PaginationLink>
          </PaginationItem>
        )}

        {/* 이전 페이지 */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`${baseUrl}?${getSearchParamsWithoutPage()}&page=${
                currentPage - 1
              }`}
            />
          </PaginationItem>
        )}

        {/* 1, 2, ... 페이지 */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              className={cn(
                "text-[19px] text-[#555555] relative",
                page === currentPage
                  ? "font-bold text-klea_text_primary after:absolute after:size-[6px] after:-bottom-1 after:inline-block after:bg-klea_text_primary after:rounded-full"
                  : ""
              )}
              href={`${baseUrl}?${getSearchParamsWithoutPage()}&page=${page}`}
              isActive={page === currentPage ? true : false}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 다음 페이지 */}
        {currentPage < totalPage && (
          <PaginationItem>
            <PaginationNext
              href={`${baseUrl}?${getSearchParamsWithoutPage()}&page=${
                currentPage + 1
              }`}
            />
          </PaginationItem>
        )}

        {/* 마지막 페이지 */}
        {currentPage < totalPage && (
          <PaginationItem>
            <PaginationLink
              href={`${baseUrl}?${getSearchParamsWithoutPage()}&page=${totalPage}`}
            >
              <ArrowRight className="size-4" />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

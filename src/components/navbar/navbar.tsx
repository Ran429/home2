"use client";

import { getBoardTypeEnum } from "@/constants/board-type";
import { getBusinessTypeEnum } from "@/constants/business-type";
import { getIntroduceType } from "@/constants/introduce-type";
import useWindowSize from "@/hooks/use-window-size";
import { usePathname } from "next/navigation";
import MobileDetailPageNavBar from "./mobile-detail-page-navbar";
import MobileNavBar from "./mobile-navbar";
import PcNavBar from "./pc-navbar";

export default function NavBar() {
  const { isMobile } = useWindowSize();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isBoard = pathname.startsWith("/board");
  const isBusiness = pathname.startsWith("/business");
  const isIntroduce = pathname.startsWith("/introduce");
  const isInfo = pathname === "/info";
  const isSitemap = pathname === "/sitemap";
  const isSearch = pathname === "/search";
  let title;
  if (isInfo) {
    title = "정보자료";
  } else if (isSitemap) {
    title = "사이트맵";
  } else if (isSearch) {
    title = "통합검색";
  }

  if (isMobile === undefined) return null;

  if (isMobile) {
    if (isHome) {
      return <MobileNavBar />;
    }

    if (isBoard) {
      const boardTypeCode = pathname.split("/")[2].toUpperCase();
      const boardType = getBoardTypeEnum(boardTypeCode);
      if (!boardType) {
        return null;
      }

      return <MobileDetailPageNavBar title={boardType.text} />;
    }

    if (isBusiness) {
      const businessType = getBusinessTypeEnum(pathname);
      if (!businessType) {
        return null;
      }

      return <MobileDetailPageNavBar title={businessType.title} />;
    }

    if (isIntroduce) {
      const introduceType = getIntroduceType(pathname);
      if (!introduceType) {
        return null;
      }

      return <MobileDetailPageNavBar title={introduceType.title} />;
    }

    return <MobileDetailPageNavBar title={title ?? ""} />;
  }

  return <PcNavBar />;
}

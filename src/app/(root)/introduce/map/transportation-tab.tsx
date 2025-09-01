"use client";

import BoldText from "@/components/common/bold-text";
import DottedDivider from "@/components/common/dotted-divider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const transportation = {
  metro: {
    code: "metro",
    text: "지하철",
  },
  bus: {
    code: "bus",
    text: "버스",
  },
};

const transportations = [transportation.metro, transportation.bus];

export default function TransportationTab() {
  const CONTENT_TEXT_CLASSNAME = "text-[15px] lg:text-xl";

  return (
    <article>
      <Tabs defaultValue={transportation.metro.code}>
        <TabsList className="flex flex-row justify-start items-center flex-wrap mt-12 lg:mt-16 gap-3">
          {transportations.map((it) => (
            <TabsTrigger
              value={it.code}
              key={it.code}
              className={cn(
                "hover:bg-[#333333] hover:text-white",
                "rounded-3xl",
                "mobile: px-7 py-2 text-sm",
                "pc lg:px-7 lg:py-3 lg:text-[18px]",
                "data-[state=active]:bg-[#333333] data-[state=active]:text-white",
                "bg-[#F8F8F8] text-[#333333]"
              )}
            >
              {it.text}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent
          value={transportation.metro.code}
          className="bg-[#F5F5F5] px-8 py-8 lg:px-[73px] mt-6 lg:py-[60px] rounded-xl lg:mt-7"
        >
          <div className="flex flex-row items-center gap-3 lg:gap-8">
            <TabsContentTitle title="지하철 안내" />
          </div>
          <DottedDivider className="mt-7 mb-12" />

          <p className={cn(CONTENT_TEXT_CLASSNAME)}>
            <BoldText>6호천, 공항철도, 경의중앙선</BoldText> 이용시
          </p>
          <ul className="mt-5 flex flex-col gap-3 list-square pl-5">
            <li className={cn(CONTENT_TEXT_CLASSNAME)}>
              <BoldText>디지털미디어시티역 2번출구</BoldText>에서{" "}
              <BoldText>버스 771,7711, 7730, 6715</BoldText> 탑승 후{" "}
              <BoldText>월드컵5단지, 상암중고등학교입구</BoldText> 하차
            </li>
          </ul>
        </TabsContent>

        <TabsContent
          value={transportation.bus.code}
          className="bg-[#F5F5F5] px-8 py-10 lg:px-[73px] mt-6 lg:py-[60px] rounded-xl lg:mt-7"
        >
          <div className="flex flex-row items-center gap-3 lg:gap-8">
            <TabsContentTitle title="버스 안내" />
            {/* <TabsContentLinkButton
              title="실시간 버스 운행정보"
              href="https://bis.sejong.go.kr/web/traffic/traffic_bus_line_search.view"
            /> */}
          </div>
          <DottedDivider className="mt-7 mb-12" />

          <p className={cn(CONTENT_TEXT_CLASSNAME)}>
            <BoldText>간선버스</BoldText> 이용시
          </p>
          <ul className="mt-5 flex flex-col gap-3 list-square pl-5">
            <li className={cn(CONTENT_TEXT_CLASSNAME)}>
              <BoldText>171, 271, 710, 771</BoldText> 탑승 후{" "}
              <BoldText>우리기술사옥, 한국지역정보개발원 하차</BoldText>
            </li>
          </ul>

          <p className={cn(CONTENT_TEXT_CLASSNAME, "mt-12")}>
            <BoldText>지선버스</BoldText> 이용시
          </p>

          <ul className="mt-5 flex flex-col gap-3 list-square pl-5">
            <li className={cn(CONTENT_TEXT_CLASSNAME)}>
              <BoldText>6715, 7019, 7711, 7730</BoldText> 탑승 후{" "}
              <BoldText>우리기술사옥, 한국지역정보개발원 하차</BoldText>
            </li>
          </ul>

          <p className={cn(CONTENT_TEXT_CLASSNAME, "mt-12")}>
            <BoldText>광역버스</BoldText> 이용시
          </p>

          <ul className="mt-5 flex flex-col gap-3 list-square pl-5">
            <li className={cn(CONTENT_TEXT_CLASSNAME)}>
              <BoldText>9711A, 9711B</BoldText> 탑승 후{" "}
              <BoldText>우리기술사옥, 한국지역정보개발원 하차</BoldText>
            </li>
          </ul>

          <p className={cn(CONTENT_TEXT_CLASSNAME, "mt-12")}>
            <BoldText>마을버스</BoldText> 이용시
          </p>

          <ul className="mt-5 flex flex-col gap-3 list-square pl-5">
            <li className={cn(CONTENT_TEXT_CLASSNAME)}>
              <BoldText>마을버스 18, 18-1</BoldText> 탑승 후{" "}
              <BoldText>우리기술사옥, 한국지역정보개발원 하차</BoldText>
            </li>
          </ul>
        </TabsContent>
      </Tabs>
    </article>
  );
}

function TabsContentTitle({ title }: { title: string }) {
  return <p className="font-bold text-xl lg:text-4xl">{title}</p>;
}

function TabsContentLinkButton({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className={cn(
        "flex flex-row justify-between font-semibold text-sm lg:text-base text-white bg-[#79A1FF] rounded-3xl pl-6 pr-4 py-2 items-center gap-2",
        HOVER_CLASSNAME
      )}
    >
      <Image
        src="/images/icons/icon_calendar.png"
        width={24}
        height={24}
        alt="icon_calendar"
      />
      {title}
      <ChevronRight className="size-7" />
    </Link>
  );
}

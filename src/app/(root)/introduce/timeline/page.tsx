import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import RepresentiveBackground from "@/components/common/represent-background";
import IntroduceTab from "@/components/introduce/introduce-tab";
import { IntroduceType } from "@/constants/introduce-type";
import { cn } from "@/lib/utils";
import TimeLine from "./time-line";
import { Metadata } from "next";
import { CommonMetadata } from "@/constants/common-metadata";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "연혁 | 한국지방교육행정연구재단",
  description:
    "학교용지 및 학교시설 무상공급 지원기관 신규지정, 지방교육행정기관 타당성조사 전문기관 신규지정",
};

type Props = {};

export default async function IntroducePage({}: Props) {
  const introduceType = IntroduceType.TIMELINE;

  return (
    <>
      <CommonBreadcrumb
        breadcrumbs={introduceType.breadcrumbs}
        hiddenInMobile
      />

      <RepresentiveBackground type="introduce" />

      <section
        className={cn(
          "container px-5 container:px-0",
          "pc lg:mt-[71px]",
          "mobile mt-28"
        )}
      >
        <IntroduceTab introduceType={introduceType} />

        <div className="mt-14 lg:mt-32 flex flex-col justify-center items-start">
          <h2 className="text-[36px] lg:text-[84px] font-medium text-klea_text_primary">
            2024 ~
          </h2>

          <TimeLine />
        </div>
      </section>
    </>
  );
}

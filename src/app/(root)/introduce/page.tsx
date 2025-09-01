import BoldText from "@/components/common/bold-text";
import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import RepresentiveBackground from "@/components/common/represent-background";
import IntroduceTab from "@/components/introduce/introduce-tab";
import { CommonMetadata } from "@/constants/common-metadata";
import { IntroduceType } from "@/constants/introduce-type";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "소개 | 한국지방교육행정연구재단",
  description:
    "학교용지 및 학교시설 무상공급 지원 전문기관지방교육행정기관 총 사업비 500억원 이상 신규사업에 대한 타당성조사 전문기관",
};

type Props = {};

export default async function IntroducePage({}: Props) {
  const introduceType = IntroduceType.INTRODUCE;

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

        <div className="mt-14 lg:mt-32 flex flex-col justify-center items-center">
          <h3 className="text-xl lg:text-[35px] lg:leading-[55px] font-bold mt-5 text-center lg:max-w-[1100px]">
            학교용지 및 학교시설 무상공급 지원 전문기관지방교육행정기관 총
            사업비 500억원 이상 신규사업에 대한 타당성조사 전문기관
          </h3>
          <p className="text-[15px] lg:text-[18px] lg:leading-[35px] font-medium mt-6 text-center lg:max-w-[1000px]">
            한국지방교육행정연구재단은 학교용지 및 학교시설 무상공급 지원기관,
            지방교육행정기관 총 사업비 500억원 이상 신규사업에 대한 타당성조사
            전문기관 등 교육부 정책 사업의 전문 기관으로 지정되어 학교용지 및
            학교설립 개선을 위한 다양한 연구와 사업을 수행하고 있습니다.
          </p>
        </div>

        <div
          className={cn(
            "mobile pt-12 flex-col",
            "pc lg:pt-0 lg:mt-28 lg:flex-row",
            "flex gap-[10px] flex-wrap relative"
          )}
        >
          <Image
            src="/images/background/introduce/bg_introduce.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="bg_introduce"
            className="w-full aspect-auto"
            priority
            loading="eager"
            quality={100}
          />
        </div>
      </section>

      <section
        className={cn(
          "w-full flex flex-col gap-20 lg:gap-40 px-5",
          "pc lg:mt-48",
          "mobile mt-20"
        )}
      >
        <div className="w-full flex flex-col-reverse gap-10 lg:gap-0 lg:flex-row">
          <div className="flex-1 flex flex-col justify-center items-start relative xl:left-[calc(50%-700px)]">
            <Image
              src="/images/icons/introduce/icon_keypoint1.png"
              width={0}
              height={0}
              sizes="20vw"
              alt="icon_keypoint"
              className="lg:w-[230px] w-[150px] aspect-auto"
            />
            <p className="max-w-[80%] lg:max-w-[700px] mt-6 lg:mt-16 font-semibold text-2xl leading-[36px] lg:text-[44px] lg:leading-[58px]">
              학교용지 및 학교시설
              <br />
              <BoldText className="bg-gradient-1/2 from-50% from-[#FFFFFF]/0 to-50% to-[#2C64E7]/15 mr-2">
                무상공급 지원
              </BoldText>
              전문기관
            </p>
          </div>

          <Image
            src="/images/background/introduce/bg_background1.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="bg_background"
            className="w-full lg:max-w-[50%] flex-1 aspect-square lg:aspect-auto"
          />
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-24">
          <Image
            src="/images/background/introduce/bg_background2.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="bg_background"
            className="w-full lg:max-w-[50%] flex-1 aspect-square lg:aspect-auto"
          />

          <div className="flex-1 flex flex-col justify-center items-start">
            <Image
              src="/images/icons/introduce/icon_keypoint2.png"
              width={0}
              height={0}
              sizes="20vw"
              alt="icon_keypoint"
              className="lg:w-[230px] w-[150px] aspect-auto"
            />
            <p className="max-w-[80%] lg:max-w-[80%] mt-6 lg:mt-16 font-semibold text-2xl leading-[36px] lg:text-[44px] lg:leading-[58px]">
              <span className="lg:text-[30px]">
                지방교육행정기관 <BoldText>총 사업비 500억원 이상</BoldText>
              </span>{" "}
              신규사업에 대한
              <BoldText className="font-bold bg-gradient-1/2 from-50% from-[#FFFFFF]/0 to-50% to-[#2C64E7]/15 mx-2">
                타당성조사
              </BoldText>
              전문기관
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

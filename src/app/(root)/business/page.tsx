import BusinessSubTitle from "@/components/business/business-subtitle";
import BusinessTab from "@/components/business/business-tab";
import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import RepresentiveBackground from "@/components/common/represent-background";
import { BusinessType } from "@/constants/business-type";
import { CommonMetadata } from "@/constants/common-metadata";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "사업소개 | 한국지방교육행정연구재단",
  description:
    "지방교육행정기관 재정투자사업 투자심사 지원, 교육행정기관 컨설팅 및 시스템 운영관리, 타당성조사",
};

type Props = {};

export default async function BusinessPage({}: Props) {
  const businessType = BusinessType.BUSINESS;

  const businessDescriptions = [
    {
      image: "/images/background/business/bg_business_investment.png",
      title: "지방교육행정기관 재정투자사업 투자심사 지원",
      desc: "학교신설수요를 적정하게 관리하기 위한 지방교육행정기관 재정투자사업 투자심사 지원 업무 수행",
      link: "/business/regional/investment",
    },
    {
      image: "/images/background/business/bg_business_operating.png",
      title: "교육행정기관 컨설팅 및 시스템 운영관리",
      desc: "초ㆍ중ㆍ고 학구(통학구역) 관리 및 안내, 학생 배치 및 학교 설립 업무 지원을 위한 정보시스템 운영ㆍ관리",
      link: "/business/operating/establishment",
    },
    {
      image: "/images/background/business/bg_business_feasibility.png",
      title: "타당성조사",
      desc: "지방교육행정기관 신설 시 총 사업비 500억원 이상인 신규 사업에 대한 타당성조사 업무 수행",
      link: "/business/feasibility",
    },
    {
      image: "/images/background/business/bg_business_special_grant.png",
      title: "특별교부금 운영ㆍ지원",
      desc: "특별교부금 국가시책사업 평가 운영ㆍ지원 및 평가제도 개선",
      link: "/business/special-grant",
    },
  ];

  return (
    <>
      <CommonBreadcrumb breadcrumbs={businessType.breadcrumbs} hiddenInMobile />
      <RepresentiveBackground type="business" />

      <section
        className={cn(
          "container",
          "pc lg:mt-[71px] container:px-0 lg:mb-20",
          "mobile px-8 mt-28 mb-4"
        )}
      >
        <BusinessTab businessType={businessType} />
        <BusinessSubTitle businessType={businessType} />
      </section>

      <section className="w-full bg-klea_bg_deep_gray z-0">
        <div
          className={cn(
            "container grid grid-rows-4 grid-col-1 justify-center items-center gap-4",
            "pc lg:grid-row-1 lg:grid-cols-4 lg:gap-[10px] lg:mt-32 container:px-0",
            "mobile flex-col px-8"
          )}
        >
          {businessDescriptions.map((item, index) => (
            <BusinessDesc
              key={index}
              image={item.image}
              title={item.title}
              desc={item.desc}
              link={item.link}
            />
          ))}
        </div>
      </section>

      <section className="container mt-32 mb-20">
        <Image
          src="/images/background/business/bg_business_introduction.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="bg_business_introduction"
          className="mx-auto px-8 lg:px-0 w-full container:max-w-[70%] aspect-auto"
        />
      </section>
    </>
  );
}

function BusinessDesc({
  image,
  title,
  desc,
  link,
}: {
  image: string;
  title: string;
  desc: string;
  link: string;
}) {
  return (
    <Link
      className={cn(
        "w-full min-h-[450px] max-h-[450px] lg-max-w-[600px] lg:min-h-[600px] relative flex flex-col justify-center items-center",
        "group hover:-translate-y-3 transition-all"
      )}
      href={link}
    >
      <Image
        src={image}
        width={0}
        height={0}
        sizes="100vw"
        alt="bg_business_investment"
        className="w-full aspect-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 min-h-[450px] max-h-[450px] lg-max-w-[600px] lg:min-h-[600px]"
      />
      <p className="text-white font-bold text-[20px] lg:text-[26px] mx-20 text-center group-hover:scale-110 transition-all">
        {title}
      </p>
      <p className="text-white font-medium text-[14px] lg:text-base mt-3 mx-20 text-center group-hover:scale-110 transition-all">
        {desc}
      </p>
    </Link>
  );
}

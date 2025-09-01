import BusinessBackground from "@/components/business/business-background";
import BusinessSubTitle from "@/components/business/business-subtitle";
import BusinessTab from "@/components/business/business-tab";
import BusinessWhatToDo from "@/components/business/business-what-to-do";
import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import CommonDetailSection from "@/components/common/common-detail-section";
import RepresentiveBackground from "@/components/common/represent-background";
import { BusinessType } from "@/constants/business-type";
import { CommonMetadata } from "@/constants/common-metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "특별교부금 운영ㆍ지원 | 한국지방교육행정연구재단",
  description: "특별교부금 국가시책사업 평가 운영ㆍ지원 및 평가제도 개선",
};

type Props = {};

export default async function BusinessPage({}: Props) {
  const businessType = BusinessType.SPECIAL_GRANT;
  const backgroundValues = [
    {
      image: "/images/background/business/special-grant/bg_background1.png",
      text: "특별교부금 국가시책사업의 계획-집행-성과를 종합적으로 평가하여 지방교육재정의 효과성ㆍ효율성 제고",
    },
    {
      image: "/images/background/business/special-grant/bg_background2.png",
      text: "특별교부금 국가시책사업 평가 과정에서 도출된 평가 및 지표 개선 의견 반영 등을 통한 사업 환류 체계 구축",
    },
  ];
  const businessWhatToDo = [
    {
      icon: "/images/icons/icon_teach.png",
      content:
        "특별교부금 국가시책사업 평가를 위한 세부 시행계획 수립 및 평가 운영ㆍ지원",
    },
    {
      icon: "/images/icons/icon_development.png",
      content:
        "평가지표 개선 및 평가편람 등 개발,  자체성과보고서 및 국가시책사업 집행결과 데이터 검토",
    },
    {
      icon: "/images/icons/icon_check.png",
      content: "평가결과 산출 및 분석, 결과보고서 발간",
    },
    {
      icon: "/images/icons/icon_discuss.png",
      content: "특별교부금 국가시책사업 성과ㆍ연장평가 개선(안) 도출",
    },
  ];

  return (
    <>
      <CommonBreadcrumb breadcrumbs={businessType.breadcrumbs} hiddenInMobile />
      <RepresentiveBackground type="business" />

      <CommonDetailSection>
        <BusinessTab businessType={businessType} />
        <BusinessSubTitle businessType={businessType} />
      </CommonDetailSection>

      <BusinessBackground values={backgroundValues} />
      <BusinessWhatToDo values={businessWhatToDo} />
    </>
  );
}

import BusinessBackground from "@/components/business/business-background";
import BusinessSubTab from "@/components/business/business-subtab";
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
  title: "교육행정기관 설립 컨설팅 | 한국지방교육행정연구재단",
  description:
    "학교설립, 학교 통ㆍ폐합, 이전재배치, 학교시설 복합화, 중앙투자심사 주요현안, 정보시스템 활용 방법 교육 실시",
};

type Props = {};

export default async function BusinessPage({}: Props) {
  const businessType = BusinessType.OPERATING_EDUCATIONAL;
  const backgroundValues = [
    {
      image:
        "/images/background/business/operating/educational/bg_background1.png",
      text: "시·도교육청 학생배치 및 학교설립 업무담당자 연수과정 운영을 통한 업무담당자 전문성 강화",
    },
    {
      image:
        "/images/background/business/operating/educational/bg_background4.png",
      text: "업무담당자 국내ㆍ외 연수과정을 편성ㆍ운영하여 업무수행능력 제고 지원",
    },
  ];
  const businessWhatToDo = [
    {
      icon: "/images/icons/icon_education.png",
      title: "교육 실시",
      content: "정보시스템 활용 방법 교육 실시",
    },
    {
      icon: "/images/icons/icon_teach.png",
      title: "업무 담당자를 위한 전문성 강화 교육 실시",
      content: "시·도교육청 업무 담당자를 위한 타당성조사에 대한 교육 실시",
    },
    {
      icon: "/images/icons/icon_connect.png",
      title: "체계적인 교육 실시 및 업무 효율성 제고",
      content:
        "교육 신청, 접수 및 관리 기능 개발을 통한 체계적인 교육 실시 및 업무 효율성 제고",
    },
    {
      icon: "/images/icons/icon_information.png",
      title: "다양한 법령 정보 및 최신 정보 제공",
      content:
        "투자심사제도 및 심사규칙 등 다양한 법령 정보 및 최신 정보 제공을 통한 시·도교육청 업무담당자 정보 접근성 제고",
    },
  ];

  return (
    <>
      <CommonBreadcrumb breadcrumbs={businessType.breadcrumbs} hiddenInMobile />
      <RepresentiveBackground type="business" />

      <CommonDetailSection>
        <BusinessTab businessType={businessType} />
        <BusinessSubTitle businessType={businessType} />
        <BusinessSubTab businessType={businessType} />
      </CommonDetailSection>

      <BusinessBackground values={backgroundValues} />
      <BusinessWhatToDo values={businessWhatToDo} />
    </>
  );
}

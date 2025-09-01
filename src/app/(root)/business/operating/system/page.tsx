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
  title: "학구도 정보시스템 운영ㆍ관리 | 한국지방교육행정연구재단",
  description:
    "학생배치ㆍ학교설립 지원시스템의 안정적 운영 지원 및 서비스데스크 운영, 전국 학구(통학구역) GIS DB 및 각종 현황 정보 구축ㆍ갱신을 통한 데이터 품질 제고",
};

type Props = {};

export default async function BusinessPage({}: Props) {
  const businessType = BusinessType.OPERATING_SYSTEM;
  const backgroundValues = [
    {
      image: "/images/background/business/operating/system/bg_background1.png",
      text: "정보시스템을 활용한 시·도교육청 학구도 관리업무 수행지원 필요",
    },
    {
      image: "/images/background/business/operating/system/bg_background2.png",
      text: "거주지 기반의 취학 및 진학 가능 학교 검색 서비스 제공 필요",
    },
    {
      image: "/images/background/business/operating/system/bg_background3.png",
      text: "정보시스템 기반으로 한 학구관리 정책 및 의사 결정 지원 정보시스템의 지속적인 서비스 관리 및 고도화를 통한 이용 활성화 필요",
    },
    {
      image: "/images/background/business/operating/system/bg_background4.png",
      text: "학구도 데이터의 표준/정합성 확보 및 관리수준 제고 학구도 DB(지도 및 각종 현황정보)의 주기적인 갱신을 통한 적정성 유지",
    },
  ];
  const businessWhatToDo = [
    {
      icon: "/images/icons/icon_service.png",
      title: "안정적 운영 지원 및 서비스데스크 운영",
      content:
        "학생배치ㆍ학교설립 지원시스템의 안정적 운영 지원 및 서비스데스크 운영",
    },
    {
      icon: "/images/icons/icon_improvement.png",
      title: "정보시스템 서비스 기능 및 편의성 개선",
      content:
        "사용자(교육부/시·도교육청) 중심의 정보시스템 서비스 기능 및 편의성 개선",
    },
    {
      icon: "/images/icons/icon_thumbs_up.png",
      title: "데이터 품질 제고",
      content:
        "전국 학구(통학구역) GIS DB 및 각종 현황 정보 구축ㆍ갱신을 통한 데이터 품질 제고",
    },
    {
      icon: "/images/icons/icon_graph.png",
      title: "학구도 공공데이터 표준 개발 및 개정",
      content: "학구도 공공데이터 표준 개발 및 개정",
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

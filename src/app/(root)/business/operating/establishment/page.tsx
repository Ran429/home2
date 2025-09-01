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
  title: "학생배치ㆍ학교설립 지원시스템 운영ㆍ관리 | 한국지방교육행정연구재단",
  description:
    "학생배치ㆍ학교설립 지원시스템의 안정적 운영 지원 및 서비스데스크 운영",
};

type Props = {};

export default async function BusinessPage({}: Props) {
  const businessType = BusinessType.OPERATING_ESTABLISHMENT;
  const backgroundValues = [
    {
      image:
        "/images/background/business/operating/establishment/bg_background1.png",
      text: "택지개발지구 변동, 인구(학생)수 변화, 학교 재배치 등 교육여건 변화 반영을 통해 데이터 기반의 과학적 교육정책 연구 개발 및 통계분석 자료 산출 필요",
    },
    {
      image:
        "/images/background/business/operating/establishment/bg_background2.png",
      text: "학생배치・학교설립 업무 개선, 새로운 현장의 요구사항 반영, 신기술을 적용한 사용자 편의성과 활용도 제고를 위한 지속적인 기능 개선",
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
      icon: "/images/icons/icon_db.png",
      title: "재정투자심사 관련 각종 DB 및 현황 정보 구축ㆍ갱신",
      content:
        "사업의 타당성, 적격성 검토를 위해 재정투자심사 관련 각종 DB 및 현황 정보 구축ㆍ갱신",
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

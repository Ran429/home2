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
  title: "재정투자심사 지원 | 한국지방교육행정연구재단",
  description:
    "이슈사업에 대한 현장점검 추진 및 현지실무심사를 실시하여 재정투자심사 시 판단 자료로 활용",
};

type Props = {};

export default async function BusinessPage({}: Props) {
  const businessType = BusinessType.REGIONAL_INVESTMENT;
  const backgroundValues = [
    {
      image:
        "/images/background/business/regional/investment/bg_background1.png",
      text: "지방재정 및 지방교육재정의 계획적・효율적 운영과 각종 투자 사업에 대한 중복 및 과잉 투자 방지",
    },
    {
      image:
        "/images/background/business/regional/investment/bg_background2.png",
      text: "시·도교육청 투자 사업 또는 시·도교육청과 지자체가 공동으로 투자하는 사업에 대해 예산편성 이전에 해당 사업의 적정성 및 타당성 검증을 위하여 전문기관의 사전 검토 실시",
    },
    {
      image:
        "/images/background/business/regional/investment/bg_background3.png",
      text: "학교복합시설 등 시·도 교육청과 지자체 재원이 공동 투입되는 사업에 대해 교육부와 행정안전부에서 공동투자심사 실시하여 절차 간소화 추진",
    },
    {
      image:
        "/images/background/business/regional/investment/bg_background4.png",
      text: "(사전검토 대상)<br />지방교육행정기관 재정투자사업 중앙투자심사 대상<br/>교육부-행정안전부 공동투자심사 대상",
    },
    {
      image:
        "/images/background/business/regional/investment/bg_background5.png",
      text: "중앙투자심사-정기 4회, (필요시) 수시 긴급 추진<br/>공동투자심사-정기 2회",
    },
  ];
  const businessWhatToDo = [
    {
      icon: "/images/icons/icon_review.png",
      title: "현장점검 추진 및 현지실무심사 실시",
      content:
        "이슈사업에 대한 현장점검 추진 및 현지실무심사를 실시하여 재정투자심사 시 판단 자료로 활용",
    },
    {
      icon: "/images/icons/icon_discuss.png",
      title: "선별된 사업에 대한 심도있는 논의 및 검토 실시",
      content:
        "필요 시 논의가 필요한 사업을 선별한 후 본 심사 이전에 중앙투자심사위원, 부처 간(교육부-행정안전부) 업무 협의, 공동투자심사위원 워크숍을 실시하여 선별된 사업에 대한 심도 있는 논의 및 검토 실시",
    },
    {
      icon: "/images/icons/icon_system.png",
      title: "학생배치ㆍ학교설립 지원 시스템 활용",
      content:
        "학생배치ㆍ학교설립 지원시스템을 활용하여 심사효율성 제고 및 축적된 데이터베이스 통해 정책방향 설정에 활용",
    },
    {
      icon: "/images/icons/icon_check.png",
      title: "2단계 심사 실시(필요 시)",
      content:
        "총 사업비 변경 또는 사업계획 조정이 예견되는 경우 계약체결 이전에 필요 시 한 번 더 심사하는 2단계 심사 실시",
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

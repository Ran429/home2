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
  title: "지방교육행정기관 타당성조사 | 한국지방교육행정연구재단",
  description:
    "지방교육행정기관 재정투자지원사업의 계획 검토 및 기초자료 조사, 분석",
};

type Props = {};

export default async function BusinessPage({}: Props) {
  const businessType = BusinessType.FEASIBILITY;
  const backgroundValues = [
    {
      image: "/images/background/business/feasibility/bg_background1.png",
      text: "「지방재정법」제37조의2, 「지방재정법」, 「지방교육행정기관 재정투자사업 심사규칙」 제12조, 「지방교육행정기관 재정투자사업 심사지침」에 근거하여 지방교육행정기관 신설 시 총 사업비 500억원 이상인 신규 사업에 대해 타당성조사 수행 필요",
    },
    {
      image: "/images/background/business/feasibility/bg_background2.png",
      text: `타당성조사는 투자심사의 사전절차로서 경제성, 재무성, 정책적 측면의 사업추진 가능성을 객관성·전문성을 갖춘 기관이 분석하는 사전절차임<br />
      타당성조사는 투자심사 추진을 전제로 하며, 투자심사의 합리적인 결정을 지원하는 참고자료 기능을 함`,
    },
  ];
  const businessWhatToDo = [
    {
      icon: "/images/icons/icon_investigate.png",
      title: "계획 검토 및 기초자료 조사, 분석",
      content:
        "기초자료 및 주요쟁점 분석, 시설계획 및 기술적 검토, 사업규모 및 사업비 적정성 분석, 경제성 및 운영수지 분석, 정책적 타당성 분석 등",
    },
    {
      icon: "/images/icons/icon_discuss.png",
      title: "분야별 타당성 조사",
      content: "분야별(청사, 문화·체육시설, 학교복합시설 등) 타당성조사",
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

      <BusinessBackground values={backgroundValues} imageHeight={320} />
      <BusinessWhatToDo values={businessWhatToDo} />
    </>
  );
}

/**
 * 해당 값 추가 시
 * 사업 소개 페이지에 메뉴가 추가 됩니다.
 */
export const BusinessType: {
  [key: string]: {
    mainTitle?: string;
    title: string;
    breadcrumbs: { href?: string; text: string }[];
    mainTab?: boolean;
    mainTabTitle?: string;
    mainTabOrder?: number;
    href: string;
    group: string;
  };
} = {
  BUSINESS: {
    mainTitle: "사업 소개",
    title: "사업 소개",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "주요사업" },
      { href: "/business", text: "사업 소개" },
    ],
    mainTab: true,
    mainTabTitle: "사업 소개",
    mainTabOrder: 1,
    href: "/business",
    group: "business",
  },
  REGIONAL_INVESTMENT: {
    mainTitle: "지방교육행정기관 재정투자사업 투자심사 지원",
    title: "재정투자심사 지원",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "주요사업" },
      { text: "지방교육행정기관 재정투자사업 투자심사 지원" },
      {
        href: "/business/regional/investment",
        text: "재정투자심사 지원",
      },
    ],
    mainTab: true,
    mainTabTitle: "지방교육행정기관 재정투자사업 투자심사 지원",
    mainTabOrder: 2,
    href: "/business/regional/investment",
    group: "regional",
  },
  OPERATING_EDUCATIONAL: {
    mainTitle: "교육행정기관 컨설팅 및 시스템 운영ㆍ관리",
    title: "학교설립 담당업무 교육지원 프로그램 운영",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "주요사업" },
      { text: "교육행정기관 컨설팅 및 시스템 운영ㆍ관리" },
      {
        href: "/business/operating/educational",
        text: "학교설립 담당업무 교육지원 프로그램 운영",
      },
    ],
    mainTab: true,
    mainTabTitle: "교육행정기관 컨설팅 및 시스템 운영ㆍ관리",
    mainTabOrder: 3,
    href: "/business/operating/educational",
    group: "operating",
  },
  OPERATING_ESTABLISHMENT: {
    mainTitle: "교육행정기관 컨설팅 및 시스템 운영ㆍ관리",
    title: "학생배치ㆍ학교설립 지원시스템 운영ㆍ관리",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "주요사업" },
      { text: "교육행정기관 컨설팅 및 시스템 운영ㆍ관리" },
      {
        href: "/business/operating/establishment",
        text: "학생배치ㆍ학교설립 지원시스템 운영ㆍ관리",
      },
    ],
    href: "/business/operating/establishment",
    group: "operating",
  },
  OPERATING_SYSTEM: {
    mainTitle: "교육행정기관 컨설팅 및 시스템 운영ㆍ관리",
    title: "학구도 정보시스템 운영ㆍ관리",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "주요사업" },
      { text: "교육행정기관 컨설팅 및 시스템 운영ㆍ관리" },
      {
        href: "/business/operating/consulting",
        text: "학구도 정보시스템 운영ㆍ관리",
      },
    ],
    href: "/business/operating/system",
    group: "operating",
  },
  FEASIBILITY: {
    mainTitle: "지방교육행정기관 타당성조사",
    title: "지방교육행정기관 타당성조사",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "주요사업" },
      { href: "/business/feasibility", text: "지방교육행정기관 타당성조사" },
    ],
    mainTab: true,
    mainTabTitle: "지방교육행정기관 타당성조사",
    mainTabOrder: 4,
    href: "/business/feasibility",
    group: "feasibility",
  },
  SPECIAL_GRANT: {
    mainTitle: "특별교부금 운영ㆍ지원",
    title: "특별교부금 운영ㆍ지원",
    breadcrumbs: [
      { href: "/", text: "홈" },
      { text: "주요사업" },
      { href: "/business/special-grant", text: "특별교부금 운영ㆍ지원" },
    ],
    mainTab: true,
    mainTabTitle: "특별교부금 운영ㆍ지원",
    mainTabOrder: 4,
    href: "/business/special-grant",
    group: "special-grant",
  },
};

export const BusinessTypes = [
  BusinessType.BUSINESS,
  BusinessType.FEASIBILITY,
  BusinessType.OPERATING_EDUCATIONAL,
  BusinessType.OPERATING_ESTABLISHMENT,
  BusinessType.OPERATING_SYSTEM,
  BusinessType.REGIONAL_INVESTMENT,
  BusinessType.SPECIAL_GRANT,
];

export type BusinessType = (typeof BusinessType)[keyof typeof BusinessType];

export function getMainTabs() {
  return BusinessTypes.filter((it) => it.mainTab).sort(
    (a, b) => (a.mainTabOrder ?? 0) - (b.mainTabOrder ?? 0)
  );
}

export function getBusinessTypeEnum(pathname: string) {
  return BusinessTypes.find((it) => pathname === it.href);
}

/**
 * 공통 비즈니스 타입 목록을 반환한다
 * @param businessType
 * @returns
 */
export function getCommonBusinessTypes(businessType: BusinessType) {
  return BusinessTypes.filter((it) => it.group === businessType.group);
}

import { Metadata } from "next";

export const CommonMetadata: Metadata = {
  title: "Institute for Human Vulnerability",
  description:
    "인간취약성연구소는 현대 사회에서 발생하는 다양한 인간 취약성을 탐구하고 극복 방안을 연구하는 기관입니다.",
  applicationName: "Institute for Human Vulnerability",
  category: "연구, 교육, 사회공헌",
  keywords: [
    "인간취약성연구소",
    "Human Vulnerability Research Institute",
    "취약성 연구",
    "사회적 취약성",
    "교육 및 워크숍",
    "사회공헌",
  ],
  openGraph: {
    type: "website",
    title: "Institute for Human Vulnerability",
    description:
      "현대 사회 속 인간 취약성을 탐구하고, 연구와 교육, 사회공헌 활동을 통해 극복 방안을 제시합니다.",
    url: "https://www.ihv.org", // 실제 도메인 나오면 교체
    siteName: "Institute for Human Vulnerability",
    countryName: "KR",
    locale: "ko_KR",
  },
  verification: {
    google: "", // 필요시 추가
    other: {
      "naver-site-verification": [],
    },
  },
  publisher: "IHV",
  creator: "IHV",
};

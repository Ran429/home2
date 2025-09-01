import { Metadata } from "next";
import {
  KLEA_EMAIL,
  KLEA_FAX_NUMBER,
  KLEA_PHONE_NUMBER,
} from "./klea-info.const";

export const CommonMetadata: Metadata = {
  title: "한국지방교육행정연구재단",
  description:
    "안정적 교육 환경의 토대를 마련하고 건전하고 생산적인 교육재정 운영에 기여합니다.",
  applicationName: "한국지방교육행정연구재단",
  category: "교육, 행정, 연구, 재단",
  keywords: [
    "한국지방교육행정연구재단",
    "한국지방교육",
    "교육행정연구",
    "교육행정연구재단",
  ],
  openGraph: {
    type: "website",
    title: "한국지방교육행정연구재단",
    description:
      "안정적 교육 환경의 토대를 마련하고 건전하고 생산적인 교육재정 운영에 기여합니다.",
    url: "https://www.klea.re.kr",
    siteName: "한국지방교육행정연구재단",
    // image는 opengraph-image.jpeg 참고
    // https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#opengraph-image
    countryName: "KR",
    emails: KLEA_EMAIL,
    faxNumbers: KLEA_FAX_NUMBER,
    locale: "ko_KR",
    phoneNumbers: KLEA_PHONE_NUMBER,
  },
  verification: {
    google: "mTKaEZF5vtNu79i9Ee_e2fGm0moMWJwbfp54sSxvJC8",
    other: {
      "naver-site-verification": [
        "ad79dd8372c001c9d7bc53d6605bab292be7d581",
        "6ae5b88d9817eb304d1db52c1a69b4755bd1295b",
      ],
    },
  },
  publisher: "BIFOS",
  creator: "BIFOS",
};

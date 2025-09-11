import DividerY from "@/components/common/divider-y";
import CopyrightPolicyDialog from "@/components/footer/copyright-policy-dialog";
import EmailPolicyDialog from "@/components/footer/email-policy-dialog";
import PrivacyPolicyDialog from "@/components/footer/privacy-policy-dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import FooterButton from "./footer-button";

// 연구소 정보
const INSTITUTE_INFO = {
  ADDRESS: "서울특별시 강남구 테헤란로70길 12, 402-J833호, 인간취약성연구소",
  PHONE: "02-123-4567",
  FAX: "02-987-6543",
  EMAIL: "thevulnerables@naver.com",
};

export default function Footer() {
  return (
<footer className="w-full py-10 lg:py-7 mt-20 border-t border-gray-200">      <div className="container lg:px-4 px-8">
        <div
          className={cn(
            "flex justify-between items-center gap-10 lg:gap-12",
            "lg:flex-row flex-col"
          )}
        >
          {/* 로고 */}
          <Image
            src="/images/logo/ihv_logo_white.png"
            width={200}
            height={40}
            alt="인간취약성연구소 로고"
          />

          {/* 다이얼로그 & 사이트맵 */}
          <div
            className={cn(
              "w-full text-base gap-[10px] relative",
              "lg:flex lg:flex-row lg:justify-end grid grid-cols-2"
            )}
          >
            <PrivacyPolicyDialog content="개인정보 처리방침 내용이 여기에 들어갑니다." />
            <CopyrightPolicyDialog content="저작권 정책 내용이 여기에 들어갑니다." />
            <EmailPolicyDialog content="이메일 무단 수집 거부 안내가 여기에 들어갑니다." />

            <Link href="/sitemap">
              <FooterButton title="사이트맵" />
            </Link>
          </div>
        </div>

        <div className="hidden lg:block h-px bg-white bg-opacity-30 my-6" />

        {/* 하단 주소/연락처 */}
        <div className="flex flex-col mt-8 lg:mt-0 text-center lg:text-start">
          <p className="text-sm lg:text-base text-[#A0A8C2]">
            {INSTITUTE_INFO.ADDRESS}
          </p>
          <div
            className={cn(
              "flex justify-center items-start text-sm text-[#A0A8C2] flex-wrap",
              "lg:justify-start lg:items-center flex-row lg:text-base"
            )}
          >
            <p>TEL : {INSTITUTE_INFO.PHONE}</p>
            <DividerY className="bg-[#A0A8C2] h-[13px] mx-3 mt-1 lg:mt-0" />
            <p>FAX : {INSTITUTE_INFO.FAX}</p>
            <DividerY className="bg-[#A0A8C2] h-[13px] mx-3 mt-1 lg:mt-0" />
            <p>Email : {INSTITUTE_INFO.EMAIL}</p>
          </div>
          <p className="mt-3 text-sm lg:text-base text-[#677195] text-center">
            © 2025 Institute for Human Vulnerability. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

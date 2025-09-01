import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import DottedDivider from "@/components/common/dotted-divider";
import RepresentiveBackground from "@/components/common/represent-background";
import SubTitle from "@/components/common/sub-title";
import IntroduceTab from "@/components/introduce/introduce-tab";
import { CommonMetadata } from "@/constants/common-metadata";
import { IntroduceType } from "@/constants/introduce-type";
import {
  KLEA_ADDRESS,
  KLEA_EMAIL,
  KLEA_FAX_NUMBER,
  KLEA_PHONE_NUMBER,
} from "@/constants/klea-info.const";
import { cn } from "@/lib/utils";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import KleaMap from "./klea-map";
import TransportationTab from "./transportation-tab";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "찾아오시는 길 | 한국지방교육행정연구재단",
  description:
    "6호천, 공항철도, 경의중앙선 이용시 디지털미디어시티역 2번출구에서 버스 771,7711, 7730, 6715 탑승 후 월드컵5단지, 상암중고등학교입구 하차",
};

type Props = {};

export default function IntroducePage({}: Props) {
  const introduceType = IntroduceType.MAP;

  return (
    <>
      <CommonBreadcrumb
        breadcrumbs={introduceType.breadcrumbs}
        hiddenInMobile
      />

      <RepresentiveBackground type="introduce" />

      <section
        className={cn(
          "container px-5 container:px-0",
          "pc lg:mt-[71px]",
          "mobile mt-28"
        )}
      >
        <IntroduceTab introduceType={introduceType} />
        <KleaMap />

        <article className="mt-14 lg:mt-32 flex flex-col justify-center items-center">
          <SubTitle title="찾아오시는 길" />
          <DottedDivider className="mt-10 lg:mt-20" />

          <div className="mt-12 lg:mt-14 text-start lg:text-center flex flex-col gap-5">
            <div className="flex flex-row gap-1 items-start lg:items-center">
              <MapPinIcon className="size-6" />
              <p className="font-medium text-base lg:text-xl">{KLEA_ADDRESS}</p>
            </div>

            <p className="block lg:hidden font-medium text-[15px] px-5 lg:px-7 lg:text-[base] text-[#646464]">
              TEL : {KLEA_PHONE_NUMBER}
              <br />
              FAX : {KLEA_FAX_NUMBER}
              <br />
              E-MAIL : {KLEA_EMAIL}
            </p>

            <p className="hidden lg:block font-medium text-[18px] text-[#646464]">
              TEL : {KLEA_PHONE_NUMBER} | FAX : {KLEA_FAX_NUMBER} | E-MAIL :{" "}
              {KLEA_EMAIL}
            </p>
          </div>
        </article>

        <TransportationTab />
      </section>
    </>
  );
}

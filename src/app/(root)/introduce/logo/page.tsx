import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import CommonDetailSection from "@/components/common/common-detail-section";
import DottedDivider from "@/components/common/dotted-divider";
import RepresentiveBackground from "@/components/common/represent-background";
import SubTitle from "@/components/common/sub-title";
import IntroduceTab from "@/components/introduce/introduce-tab";
import { CommonMetadata } from "@/constants/common-metadata";
import { IntroduceType } from "@/constants/introduce-type";
import { logoSignatures } from "@/constants/logos.const";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LogoSignature from "./logo-signature";
import SymbolDesc from "./symbol-desc";
import LogoDesc from "./logo-desc";
import ClientFileUtil from "@/lib/client-file-util";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "로고 소개 | 한국지방교육행정연구재단",
  description: "KLEA의 CI를 소개합니다",
};

type Props = {};

export default async function IntroducePage({}: Props) {
  const introduceType = IntroduceType.LOGO;

  const LogoDescriptionValues = [
    {
      description:
        "뇌를 시각적으로 구성하여 연구를 위한 노력이 교육(배움)과 성장의 밑거름이 되고 바탕이 될 수 있음을 표현하였습니다.",
    },
    {
      description:
        "연구와 생각의 본질이 교육에서부터 나오며 수많은 배움의 연속임을 책장이 넘어가는 형태로 표현하였습니다.",
    },
    {
      description:
        "연구와 교육의 발판으로 넓고 깊게 성장을 이루는 것을 표현하였습니다.",
    },
    {
      description:
        "연구, 교육, 성장이 하나가 되어 풍성한 나무가 된다는 것을 표현하였고 이 세 가지가 모여 신뢰(청색)를 형성한다는 것을 표현하였습니다.",
    },
  ];

  return (
    <>
      <CommonBreadcrumb
        breadcrumbs={introduceType.breadcrumbs}
        hiddenInMobile
      />

      <RepresentiveBackground type="introduce" />

      <CommonDetailSection>
        <IntroduceTab introduceType={introduceType} />

        <div className="mt-14 lg:mt-32 flex flex-col justify-center items-center">
          <SubTitle title="KLEA의 CI를 소개합니다" />
          <DottedDivider className="mt-10 lg:mt-20" />
        </div>

        <div className="mt-16 lg:mt-32">
          <SubTitle title="로고 소개" />

          <div
            className={cn(
              "flex items-start justify-center gap-12 lg:gap-20 mt-5 lg:mt-20",
              "flex-col lg:flex-row"
            )}
          >
            <Image
              src="/images/logo/logo_desc.png"
              width={226}
              height={244}
              alt="logo_desc"
              className="mx-auto lg:mx-0"
            />

            <div className="max-w-[540px] flex flex-col gap-8">
              {LogoDescriptionValues.map((desc, index) => (
                <LogoDesc
                  number={index + 1}
                  key={index + 1}
                  description={desc.description}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "border border-[#EEEEEE] rounded-xl flex flex-row items-center py-16 gap-8",
            "px-12 mt-14 overflow-x-auto w-full",
            "pc lg:mt-32 xl:overflow-x-hidden xl:justify-center lg:px-24"
          )}
        >
          <SymbolDesc
            title="뇌(연구)"
            image="/images/icons/icon_brain.png"
            desc="어떤 일이나 사물에 대하여 깊이있게 연구하고 판단하는 생각의 근원인 뇌를 모티브로 함"
          />

          <PlusIcon className="min-w-8 text-[#B6B6B6]" />

          <SymbolDesc
            title="책(교육)"
            image="/images/icons/icon_book.png"
            desc="뇌를 효율적으로 육성ㆍ발전 시키고, 개발할 수 있게 도움과 자극을 주는 원동력인 책을 모티브로 함"
          />

          <PlusIcon className="min-w-8 text-[#B6B6B6]" />

          <SymbolDesc
            title="나무(성장)"
            image="/images/icons/icon_tree.png"
            desc="나무가 자연의 삶과 죽음의 순환 속에서 성장하는 것이 배움의 성장 과정과 같아 나무를 모티브로 함"
          />

          <ArrowRight className="min-w-16 text-[#B6B6B6]" />

          <Image
            src="/images/logo/logo_symbol.png"
            width={132}
            height={132}
            alt="logo_symbol"
          />
        </div>

        <div className="mt-14 lg:mt-32">
          <SubTitle title="시그니처" />
          <p className="text-[#333333] font-medium text-base lg:text-[18px] mt-8">
            시그니처는 KLEA의 이미지를 전달하는 중요한 역할을 하므로 임의로
            수정하거나 변경하여 사용할 수 없습니다.
            <br />
            기본형을 사용하는 것을 원칙으로 하되 배경 색상이나 환경을 고려해
            응용형을 사용할 수 있습니다.
          </p>

          <Image
            src="/images/logo/logo_big.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="logo"
            className="w-4/5 lg:w-1/2 max-w-[900px] mt-20 lg:mt-28 mx-auto"
          />

          <div
            className={cn(
              "flex flex-wrap gap-[30px]",
              "mt-20 lg:mt-36 flex-col lg:flex-row"
            )}
          >
            {logoSignatures.map((signature, index) => (
              <LogoSignature key={index} {...signature} />
            ))}
          </div>
        </div>

        <div className="mt-32 hidden lg:flex w-full flex-row items-center justify-center gap-4">
          <Link
            href={ClientFileUtil.getStaticFileUrl("logo/klea_logo.ai")}
            className={cn(
              "flex flex-row items-center bg-[#F2F4F9] px-10 py-3 rounded-3xl gap-2",
              HOVER_CLASSNAME
            )}
          >
            <span className="text-[#333333] font-semibold text-[22px]">
              AI 파일 다운로드
            </span>
            <Image
              src="/images/icons/icon_download.png"
              width={16}
              height={21}
              alt="icon_download"
            />
          </Link>

          <Link
            href={ClientFileUtil.getStaticFileUrl("logo/klea_logo.zip")}
            className={cn(
              "flex flex-row items-center bg-[#F2F4F9] px-10 py-3 rounded-3xl gap-2",
              HOVER_CLASSNAME
            )}
          >
            <span className="text-[#333333] font-semibold text-[22px]">
              JPG 파일 다운로드
            </span>
            <Image
              src="/images/icons/icon_download.png"
              width={16}
              height={21}
              alt="icon_download"
            />
          </Link>
        </div>
      </CommonDetailSection>
    </>
  );
}

import BoardTab from "@/components/board/board-tab";
import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import CommonDetailSection from "@/components/common/common-detail-section";
import RepresentiveBackground from "@/components/common/represent-background";
import HakgudoInfoServiceDialog from "@/components/info/hakgudo-info-service-dialog";
import HakgudoSystemDialog from "@/components/info/hakgudo-system-dialog";
import SupportSystemDialog from "@/components/info/support-system-dialog";
import { BoardType } from "@/constants/board-type";
import { CommonMetadata } from "@/constants/common-metadata";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "정보시스템 | 한국지방교육행정연구재단",
  description:
    "학구도 안내 서비스, 학구도 관리시스템, 학생배치ㆍ학교설립 지원시스템",
};

type Props = {};

export default async function InfoSystemPage({}: Props) {
  // board 는 아니지만 메뉴가 공통이므로 정의해서 사용
  const boardType = BoardType.INFO;

  return (
    <>
      <CommonBreadcrumb breadcrumbs={boardType.breadcrumbs} hiddenInMobile />
      <RepresentiveBackground type="board" rewriteText={boardType.text} />

      <CommonDetailSection>
        <BoardTab boardType={boardType} />

        <article
          className={cn(
            "flex",
            "mt-[72px] flex-col gap-8",
            "lg:mt-28 lg:flex-row lg:gap-14"
          )}
        >
          <div className="flex-1 object-cover rounded-xl border border-[#D9D9D9] overflow-hidden">
            <Image
              src="/images/background/info/bg_background1.png"
              width={0}
              height={0}
              alt="hakgudo_andae_service"
              sizes="100vw"
              className="w-full object-cover aspect-auto border-inherit"
            />
          </div>

          <div className="flex-1 flex flex-col gap-6 lg:gap-8">
            <InfoTitle title="학구도 안내서비스" />
            <InfoDescription
              content="학구도 안내서비스는 초ㆍ중등학교의 통학구역과 학교군, 중학구의 고시
              사항을 지리정보시스템(GIS)을 통해 제공함으로써
              학생ㆍ학부모ㆍ지역주민이 보다 편리하고 유용하게 활용할 수 있도록
              지원하는 대국민 서비스입니다."
            />

            <div className="flex flex-row gap-4 lg:gap-[18px]">
              <HakgudoInfoServiceDialog />
              <Link
                href="https://schoolzone.emac.kr"
                target="_blank"
                className={cn(
                  "border border-[#333333] rounded-md flex flex-row justify-between text-[#333333] font-semibold",
                  "py-2 lg:py-4 px-4 text-base lg:px-6 gap-8 lg:gap-14 lg:text-xl"
                )}
              >
                바로가기
                <ChevronRight />
              </Link>
            </div>
          </div>
        </article>

        <article
          className={cn(
            "flex gap-14",
            "mt-[72px] flex-col lg:mt-28 lg:flex-row"
          )}
        >
          <div className="flex-1 object-cover rounded-xl border border-[#D9D9D9] overflow-hidden">
            <Image
              src="/images/background/info/bg_background2.png"
              width={0}
              height={0}
              alt="hakgudo_andae_service"
              sizes="100vw"
              className="w-full object-cover aspect-auto border-inherit"
            />
          </div>
          <div className="flex-1 flex flex-col gap-8">
            <InfoTitle title="학구도 관리시스템" />
            <InfoDescription
              content="학구도 관리시스템은 시·도교육청 학생배치 업무담당자가 관할지역의
              초 ㆍ중 ㆍ고 학구(통학구역)를 조정 및 관리할 수 있도록 지원하는
              업무용 정보시스템입니다. 학구(통학구역) 조회, 학구 관리 등록
              이외에 학교 및 학구 위치정보를 제공하고 각종 현황
              정보(학교/학구/인구 등)를 통해 업무에 다양하게 활용할 수 있는 분석
              자료를 제공합니다."
            />

            <div className="flex flex-row gap-[18px]">
              <HakgudoSystemDialog />
            </div>
          </div>
        </article>

        <article
          className={cn(
            "flex gap-14",
            "mt-[72px] flex-col lg:mt-28 lg:flex-row"
          )}
        >
          <div className="flex-1 object-cover rounded-xl border border-[#D9D9D9] overflow-hidden">
            <Image
              src="/images/background/info/bg_background3.png"
              width={0}
              height={0}
              alt="hakgudo_andae_service"
              sizes="100vw"
              className="w-full object-cover aspect-auto border-inherit"
            />
          </div>
          <div className="flex-1 flex flex-col gap-8">
            <InfoTitle title="학생배치ㆍ학교설립 지원시스템" />
            <InfoDescription
              content="학생배치ㆍ학교설립 지원시스템은 과학적인 데이터에 기반한
              학교신설수요 관리 및 재정투자심사 업무를 지원하기 위하여 구축된
              업무용 정보시스템입니다. 택지개발지구 변동, 인구(학생)수 변화,
              학교 재배치 등 교육여건 변화 반영을 통해 학생배치 및 학교설립 관련
              통계 분석과 정책 수립 등의 업무에 다양하게 활용됩니다."
            />

            <div className="flex flex-row gap-[18px]">
              <SupportSystemDialog />
            </div>
          </div>
        </article>
      </CommonDetailSection>
    </>
  );
}

function InfoTitle({ title }: { title: string }) {
  return <h2 className="font-bold text-[28px] lg:text-4xl">{title}</h2>;
}

function InfoDescription({ content }: { content: string }) {
  return (
    <p className="text-[#333333] font-normal text-[15px] leading-[24px] lg:text-[18px] lg:leading-[30px]">
      {content}
    </p>
  );
}

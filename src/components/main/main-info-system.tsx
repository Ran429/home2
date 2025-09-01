import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { FONT_ONETWOTHREE_RF } from "@/lib/font-util";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function MainInfoSytem() {
  const mainInfoSystem = [
    {
      text: "학구도 안내서비스",
      href: "/info",
      icon: "/images/icons/main/icon_infosystem1.svg",
    },
    {
      text: "학구도 관리시스템",
      href: "/info",
      icon: "/images/icons/main/icon_infosystem2.svg",
    },
    {
      text: "학생배치ㆍ학교설립 지원시스템",
      href: "/info",
      icon: "/images/icons/main/icon_infosystem3.svg",
    },
  ];

  return (
    <section className="container mt-20 pb-14 lg:pb-24 px-4">
      <article className="max-w-[75%] lg:max-w-[800px] w-full mx-auto">
        <h2
          className={cn(
            "text-center",
            "pc lg:text-[45px] lg:leading-[60px]",
            "mobile text-2xl leading-[35px]",
            FONT_ONETWOTHREE_RF.className
          )}
        >
          <span className="text-klea_text_primary">KLEA</span>는 모두가 만족하고
          모두가 행복한 대한민국 교육의 지도를 만들어갑니다.
        </h2>
      </article>

      <article
        className={cn(
          "flex gap-[22px] w-full flex-wrap",
          "pc lg:mt-[59px] lg:flex-row",
          "mobile mt-8 flex-col"
        )}
      >
        {mainInfoSystem.map((infoSystem) => (
          <Link
            key={infoSystem.text}
            href={infoSystem.href}
            className={cn(
              "flex-1 bg-[#F4F6F8] px-10 py-6 flex flex-row items-center rounded-[17px]",
              "pc lg:justify-center",
              "mobile justify-start",
              "group"
            )}
          >
            <Image
              src={infoSystem.icon}
              width={0}
              height={0}
              sizes="10vw"
              className="size-28 lg:size-40 group-hover:scale-110 transition-all"
              alt="icon"
            />

            <span className="font-bold text-xl text-[#333333] flex-1 text-center group-hover:scale-110 transition-all">
              {infoSystem.text}
            </span>
          </Link>
        ))}
      </article>
    </section>
  );
}

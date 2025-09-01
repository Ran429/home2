import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import Divider from "@/components/common/divider";
import RepresentiveBackground from "@/components/common/represent-background";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SitemapTab from "./sitemap-tab";
import { KLEA_MENU } from "@/constants/menu";
import { Fragment } from "react";
import { Metadata } from "next";
import { CommonMetadata } from "@/constants/common-metadata";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "사이트맵 | 한국지방교육행정연구재단",
  description: "홈페이지의 메뉴들을 나열하고 이동할 수 있는 경로를 제공합니다",
};

type Props = {};

export default async function SitemapPage({}: Props) {
  const breadCrumbs = [
    { href: "/", text: "홈" },
    { text: "홈페이지 가이드" },
    {
      href: "/sitemap",
      text: "사이트맵",
    },
  ];

  return (
    <>
      <CommonBreadcrumb breadcrumbs={breadCrumbs} hiddenInMobile />
      <RepresentiveBackground type="sitemap" />

      <section
        className={cn(
          "container mb-20 px-5",
          "pc lg:mt-[71px]",
          "mobile mt-28"
        )}
      >
        <SitemapTab />

        {KLEA_MENU.map((menu, index) => (
          <Fragment key={menu.text}>
            <div
              id={menu.hash.substring(1)}
              className={cn(
                "flex flex-col pt-10 pb-14 lg:pt-[100px] gap-7 lg:gap-10",
                index === KLEA_MENU.length - 1 ? "lg:pb-0" : " lg:pb-[100px] "
              )}
            >
              <h2 className="font-bold text-[28px] lg:text-3xl">{menu.text}</h2>

              <div
                className={cn(
                  "flex",
                  "flex-col gap-7",
                  "lg:flex-row lg:gap-20 xl:gap-[120px]"
                )}
              >
                {menu.children.map((secondMenu) =>
                  secondMenu.children && secondMenu.children.length > 0 ? (
                    <div
                      key={secondMenu.text}
                      className="flex flex-col gap-5 lg:gap-9 flex-1"
                    >
                      <SecondMenu
                        key={secondMenu.text}
                        title={secondMenu.text}
                        href={secondMenu.href}
                      />
                      <ul className="flex flex-col gap-4 lg:gap-6">
                        {secondMenu.children.map((thirdMenu) => (
                          <li key={thirdMenu.text}>
                            <ThirdMenu
                              title={thirdMenu.text}
                              href={thirdMenu.href}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <SecondMenu
                      key={secondMenu.text}
                      title={secondMenu.text}
                      href={secondMenu.href}
                      classname={cn(index === 0 ? "flex-1" : "")}
                    />
                  )
                )}
              </div>
            </div>
            {index < KLEA_MENU.length - 1 && <Divider />}
          </Fragment>
        ))}
      </section>
    </>
  );
}

// 2차메뉴
function SecondMenu({
  title,
  href,
  classname,
}: {
  title: string;
  href?: string;
  classname?: string;
}) {
  return (
    <Link
      href={href ?? "#"}
      className={cn("text-xl font-semibold", HOVER_CLASSNAME, classname)}
    >
      {title}
    </Link>
  );
}

// 3차메뉴
function ThirdMenu({
  title,
  href,
  classname,
}: {
  title: string;
  href: string;
  classname?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-[#555555] text-[18px] font-normal",
        HOVER_CLASSNAME,
        classname
      )}
    >
      {title}
    </Link>
  );
}

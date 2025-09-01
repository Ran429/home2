"use client";

import Divider from "@/components/common/divider";
import DividerY from "@/components/common/divider-y";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { KLEA_MENU } from "@/constants/menu";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DottedDivider from "../common/dotted-divider";

export default function MobileMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function movePage(event: React.SyntheticEvent, url: string) {
    event.preventDefault();
    setOpen(false);
    router.push(url);
  }

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  function search() {
    if (searchKeyword === "") {
      alert("검색어를 입력하세요.");
      return;
    }

    setOpen(false);
    router.push("/search?keyword=" + searchKeyword);
  }

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="ml-2 border-[#BBBBBB] border-2 rounded-2xl p-1.5 cursor-pointer">
        <Image
          src="/images/icons/icon_sitemap.png"
          width="34"
          height="34"
          alt="icon_menu"
          className={HOVER_CLASSNAME}
        />
      </DrawerTrigger>

      <DrawerContent className="w-4/5 pt-10 h-full max-w-[500px]">
        <div className="w-full overflow-y-auto">
          <div className="flex flex-row items-center pl-7 gap-3">
            <Link href="/" className={HOVER_CLASSNAME}>
              <Image
                src="/images/logo/logo_mobile.png"
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                priority
                className="w-full max-w-[100px] aspect-auto"
              />
            </Link>

            <DividerY className="bg-black !h-9" />

            <span className="font-bold text-xs">
              한국지방교육
              <br />
              행정연구재단
            </span>

            <DrawerClose className="flex-none ml-auto mr-4 p-1">
              <Image
                src="/images/icons/icon_x.png"
                width="24"
                height="24"
                alt="icon_x"
              />
            </DrawerClose>
          </div>

          <Divider className="mt-6" />

          <div className="w-full relative flex items-center my-5">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className={cn(
                "text-black w-full border-[#BBBBBB] border-2 rounded-[36px] mx-6 py-3 pl-5",
                "placeholder:text-[#AAAAAA] placeholder:font-bold placeholder:text-sm" // placeholder
              )}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search();
                }
              }}
            />
            <div className="absolute right-0 mr-10">
              <MagnifyingGlassIcon
                className={cn("size-7 cursor-pointer", HOVER_CLASSNAME)}
                onClick={() => search()}
              />
            </div>
          </div>

          <Divider />

          <Accordion type="single" collapsible className="w-full">
            {KLEA_MENU.map((menu) => (
              <AccordionItem key={menu.text} value={menu.text}>
                <AccordionTrigger className="font-bold text-xl data-[state=open]:text-klea_text_primary mx-6">
                  {menu.text}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="bg-[#F8F8F8] px-6 py-8">
                    {menu.children &&
                      menu.children.map((secondMenu) =>
                        secondMenu.href ? (
                          <li
                            key={secondMenu.text}
                            className={cn(
                              "font-semibold text-[18px] py-3 text-[#333333]",
                              HOVER_CLASSNAME
                            )}
                            onClick={(event) =>
                              movePage(event, secondMenu.href)
                            }
                          >
                            <Link href={secondMenu.href}>
                              {secondMenu.text}
                            </Link>
                          </li>
                        ) : (
                          <li
                            key={secondMenu.text}
                            className={cn(
                              "font-semibold text-[18px] py-3 text-[#333333]"
                            )}
                          >
                            {secondMenu.text}
                            {secondMenu.children && (
                              <>
                                <DottedDivider className="my-3 !border-[#CCCCCC]" />
                                <ul>
                                  {secondMenu.children.map((thirdMenu) => (
                                    <li
                                      key={thirdMenu.text}
                                      className={cn(
                                        "text-base font-normal py-1",
                                        "before:size-[3px] before:rounded-full before:bg-black before:inline-block before:mx-2 before:mb-1",
                                        HOVER_CLASSNAME
                                      )}
                                      onClick={(event) =>
                                        movePage(event, thirdMenu.href)
                                      }
                                    >
                                      <Link href={thirdMenu.href}>
                                        {thirdMenu.text}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>

                                {secondMenu.hasBottomDivider && (
                                  <DottedDivider className="my-3 !border-[#CCCCCC]" />
                                )}
                              </>
                            )}
                          </li>
                        )
                      )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

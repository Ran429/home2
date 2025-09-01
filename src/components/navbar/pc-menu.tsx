"use client";

import { FIRST_MENU, KLEA_MENU } from "@/constants/menu";
import useWindowSize from "@/hooks/use-window-size";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode, useState } from "react";
import Divider from "../common/divider";

type Props = {
  onChangeVisibleMenu?: (visible: boolean) => void;
};

export default function PcMenu({ onChangeVisibleMenu }: Props) {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const router = useRouter();

  const { isMobile } = useWindowSize();
  if (isMobile) return null;

  function showMenu() {
    setVisibleMenu(true);
    onChangeVisibleMenu?.(true);
  }

  function hideMenu() {
    setVisibleMenu(false);
    onChangeVisibleMenu?.(false);
  }

  function movePage(event: React.SyntheticEvent, url: string) {
    event.preventDefault();
    setVisibleMenu(false);
    router.push(url);
  }

  return (
    <>
      <ul
        className="flex flex-row gap-16 justify-center text-xl z-20"
        onMouseEnter={() => showMenu()}
        onMouseLeave={() => hideMenu()}
      >
        {FIRST_MENU.map(({ text }) => (
          <li key={text}>
            <button
              className={cn(
                "transition-colors border-b-2 border-transparent",
                "hover:text-klea_text_primary hover:border-klea_text_primary py-[37px]"
              )}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "absolute w-full bg-white shadow-xl transition-opacity duration-300",
          visibleMenu ? "top-[100px] opacity-1" : "-top-[2000px] opacity-0"
        )}
        onMouseEnter={() => showMenu()}
        onMouseLeave={() => hideMenu()}
      >
        <Divider />

        <div className="container h-full w-full pt-6 pb-10 flex flex-row gap-5">
          {KLEA_MENU.map((menu, index) => (
            <div key={menu.text} className={cn(index > 0 ? "flex-1" : "")}>
              <div className="flex flex-row gap-1 items-center justify-start">
                <span className="font-bold text-base text-[#AAAAAA]">
                  {menu.text}
                </span>
                <ChevronRightIcon className="size-[10px] text-[#AAAAAA]" />
              </div>

              <div className="border-klea_box_border border mt-3 rounded-md">
                <ul
                  className={cn(
                    "*:font-semibold *:text-[18px] *:mt-2 *:py-1.5 px-9 py-6",
                    index > 0 ? "text-center" : ""
                  )}
                >
                  {menu.children.map((secondMenu) => (
                    <MenuLi
                      key={secondMenu.text}
                      menu={secondMenu}
                      movePage={movePage}
                    >
                      {secondMenu.children && (
                        <ul
                          className={cn(
                            "mt-3 *:text-base *:font-normal *:py-1",
                            "*:before:size-[3px] *:before:rounded-full *:before:bg-black *:before:inline-block *:before:mx-2 *:before:mb-1"
                          )}
                        >
                          {secondMenu.children.map((thirdMenu) => (
                            <MenuLi
                              menu={thirdMenu}
                              key={thirdMenu.text}
                              movePage={movePage}
                            />
                          ))}
                        </ul>
                      )}
                    </MenuLi>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function MenuLi({
  menu,
  movePage,
  children,
}: {
  menu: { text: string; href?: string };
  movePage: (e: MouseEvent<HTMLAnchorElement>, href: string) => void;
  children?: ReactNode;
}) {
  return (
    <li key={menu.text}>
      {menu.href ? (
        <Link
          href={menu.href}
          onClick={(event) => movePage(event, menu.href!)}
          className={HOVER_CLASSNAME}
        >
          {menu.text}
        </Link>
      ) : (
        <span>{menu.text}</span>
      )}

      {children}
    </li>
  );
}

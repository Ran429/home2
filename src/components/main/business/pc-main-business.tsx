"use client";

import { mainBusinessItems } from "@/constants/main-business.const";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PcMainBusiness() {
  const items = mainBusinessItems;
  const [selectedCode, setSelectedCode] = useState<string>(items[0].code);

  return (
    <div className="mt-11 flex flex-row gap-4 h-[500px]">
      {items.map((item) => (
        <div
          className={cn(
            "rounded-[20px] relative transition-all duration-500",
            selectedCode === item.code ? "w-[900px]" : "flex-1"
          )}
          key={item.code}
        >
          <Image
            src={item.image}
            width={0}
            height={0}
            sizes="100vw"
            quality={100}
            priority
            className="w-full h-full absolute -z-10 left-0 top-0 rounded-xl object-cover"
            alt="bg_main_business"
          />
          {selectedCode === item.code ? (
            <div className="bg-white rounded-tr-3xl rounded-bl-xl w-3/4 absolute bottom-0 left-0 px-12 py-12">
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="font-medium text-base mt-5">{item.subTitle}</p>

              <div className="flex flex-row gap-[10px] mt-12 flex-wrap">
                {item.links &&
                  item.links.map((link) => (
                    <Link
                      key={link.href}
                      className={cn(
                        "border-klea_text_primary border-2",
                        "flex flex-row justify-between items-center",
                        "px-4 py-[10px] gap-1",
                        "text-base text-klea_text_primary font-bold",
                        HOVER_CLASSNAME
                      )}
                      href={link.href}
                    >
                      {link.text}
                      <Image
                        src="/images/icons/icon_right_arrow.png"
                        width="14"
                        height="14"
                        alt="right_arrow"
                      />
                    </Link>
                  ))}
              </div>
            </div>
          ) : (
            <h3
              className={cn(
                "w-full text-white text-2xl font-bold text-end",
                "left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/3 rotate-[270deg] origin-center absolute"
              )}
            >
              {item.title}
            </h3>
          )}

          {selectedCode !== item.code && (
            <PlusIcon onClick={() => setSelectedCode(item.code)} />
          )}
        </div>
      ))}
    </div>
  );
}

function PlusIcon({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className={cn(
        "flex items-center justify-center",
        "size-14 bottom-10 rounded-full",
        "left-1/2 -translate-x-1/2 absolute",
        "bg-black bg-opacity-30",
        HOVER_CLASSNAME
      )}
      onClick={() => onClick?.()}
    >
      <Image
        src="/images/icons/icon_plus.png"
        width="18"
        height="27"
        alt="plus_icon"
      />
    </button>
  );
}

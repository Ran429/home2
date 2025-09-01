import { mainBusinessItems } from "@/constants/main-business.const";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MobileMainBusiness() {
  const items = mainBusinessItems;
  const [selectedCode, setSelectedCode] = useState<string>(items[0].code);

  return (
    <>
      <div className="mt-5 flex flex-col gap-4">
        {items.map((item) => (
          <div
            className={cn(
              "rounded-xl w-full relative transition-all duration-500",
              selectedCode === item.code
                ? ""
                : "h-[160px] flex flex-row justify-between items-center px-12"
            )}
            key={item.code}
            style={
              selectedCode === item.code
                ? { height: item.mobileHeight + "px" }
                : {}
            }
          >
            <Image
              src={item.image}
              width={0}
              height={0}
              sizes="100vw"
              quality={100}
              priority
              unoptimized
              className="w-full h-full absolute left-0 top-0 rounded-xl object-cover"
              alt="bg_main_business"
            />

            {selectedCode === item.code ? (
              <div className="bg-white rounded-tr-3xl rounded-bl-xl w-full absolute bottom-0 left-0 px-8 py-10">
                <h3 className="text-xl font-bold text-center">{item.title}</h3>
                <p className="font-medium text-[15px] mt-5">{item.subTitle}</p>

                <div className="flex flex-col gap-[10px] mt-5">
                  {item.links.map((link) => (
                    <Link
                      key={link.href}
                      className={cn(
                        "border-klea_text_primary border-2",
                        "flex flex-row justify-between items-center",
                        "px-4 py-2 gap-1",
                        "text-[15px] text-klea_text_primary font-bold",
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
              <>
                <PlusIcon onClick={() => setSelectedCode(item.code)} />

                <h3 className="max-w-[66%] text-white text-xl font-bold z-10 text-end">
                  {item.title}
                </h3>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="bg-[#F4F7FF] absolute bottom-0 w-full h-2/3 -z-10 left-0"></div>
    </>
  );
}

function PlusIcon({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className={cn(
        "flex items-center justify-center",
        "size-14 bottom-10 rounded-full",
        "bg-black bg-opacity-30 z-10",
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

import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  values: { image: string; text: string }[];
  imageHeight?: number;
};

// 배경 및 목적
export default function BusinessBackground({ values, imageHeight }: Props) {
  return (
    <section
      className={cn(
        "w-full bg-klea_bg_deep_gray z-0",
        "pt-14 pb-14 lg:pt-[138px] lg:pb-[71px] mt-[60px] lg:mt-[71px]"
      )}
    >
      <div className="container px-8 lg:px-0">
        <h2 className="font-semibold text-[18px] text-center lg:text-3xl lg:text-start">
          배경 및 목적
        </h2>
        <div
          className={cn(
            "flex justify-center items-center flex-wrap gap-5 mt-7",
            "flex-col lg:flex-row"
          )}
        >
          {values.map((it, index) => (
            <div
              className="w-full lg:w-[calc(50%-10px)] rounded-[10px]"
              key={index}
            >
              <div
                className="relative w-full  flex flex-col justify-end"
                style={{ height: `${imageHeight ?? 252}px` }}
              >
                <Image
                  src={it.image}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="bg_business_background"
                  className="rounded-md w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 object-cover"
                />
                <span
                  className={cn(
                    "text-sm lg:text-base absolute border-white border rounded-3xl text-white",
                    "left-5 top-6 lg:left-10 lg:top-12",
                    "px-4 lg:px-6 py-1"
                  )}
                >
                  No.{index + 1}
                </span>
                <p
                  className={cn(
                    "text-white font-semibold mx-[18px] lg:mx-[33px] text-start mb-[34px]",
                    "text-base leading-[23px] lg:text-xl lg:leading-[29px]"
                  )}
                  dangerouslySetInnerHTML={{ __html: it.text }}
                ></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

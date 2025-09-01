import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  values: { icon: string; title?: string; content?: string }[];
};

export default function BusinessWhatToDo({ values }: Props) {
  return (
    <section className={cn("container mt-[51px] mb-5", "px-8 lg:px-0")}>
      <h2 className="font-semibold text-[20px] lg:text-3xl text-center lg:text-start">
        수행 내용
      </h2>
      <div
        className={cn(
          "w-full flex items-center flex-wrap gap-5 justify-center",
          "mt-9 lg:mt-7 flex-col lg:flex-row"
        )}
      >
        {values.map((it, index) => (
          <div
            className={cn(
              "w-full flex-col flex items-center justify-center border-klea_box_border border rounded-md py-[38px] self-stretch",
              "lg:flex-row lg:w-[calc(50%-10px)] lg:justify-between lg:px-[50px]"
            )}
            key={index}
          >
            <Image src={it.icon} width={100} height={100} alt="business_icon" />

            {it.content && (
              <p
                className={cn(
                  "lg:text-[17px] lg:leading-[26px]",
                  "text-[15px] leading-[23px]",
                  "ml-0 w-2/3 lg:ml-[30px] text-[#333333] font-medium mt-4 text-center"
                )}
              >
                {it.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  title: string;
  image: string;
  height: number;
  width: number;
  bgClassname?: string;
  titleClassname?: string;
};

export default function LogoSignature({
  image,
  title,
  height,
  width,
  bgClassname,
  titleClassname,
}: Props) {
  return (
    <div
      className={cn(
        "w-full lg:w-[calc(50%-15px)] border-klea_box_border2 border rounded-xl",
        "pt-10 lg:pt-12 pb-14 lg:pb-20 px-10",
        bgClassname
      )}
    >
      <p
        className={cn(
          "text-[#888E96] text-bold text-base lg:text-[22px] font-bold",
          titleClassname
        )}
      >
        {title}
      </p>
      <div className="flex items-center justify-center mt-10 lg:mt-3 h-full">
        <Image
          src={image}
          width={width}
          height={height}
          alt="logo"
          quality={100}
        />
      </div>
    </div>
  );
}

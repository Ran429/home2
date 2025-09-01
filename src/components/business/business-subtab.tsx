import {
  BusinessType,
  getCommonBusinessTypes,
} from "@/constants/business-type";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  businessType: BusinessType;
};

export default function BusinessSubTab({ businessType }: Props) {
  return (
    <div
      className={cn(
        "flex flex-row flex-wrap justify-center gap-[11px]",
        "mt-8 lg:mt-14"
      )}
    >
      {getCommonBusinessTypes(businessType).map((tab) => (
        <Link
          href={tab.href}
          key={tab.title}
          className={cn(
            "active:bg-[#333333] active:text-white",
            "hover:bg-[#333333] hover:text-white transition-colors",
            "flex justify-center items-center text-center rounded-3xl  basis-[45%] lg:basis-auto",
            "lg:text-base lg:px-8 lg:py-[10px]",
            "text-[14px] px-6 py-[5px]",
            tab.title === businessType.title
              ? "bg-[#333333] text-white"
              : "bg-[#F8F8F8] text-[#333333]"
          )}
        >
          {tab.title}
        </Link>
      ))}
    </div>
  );
}

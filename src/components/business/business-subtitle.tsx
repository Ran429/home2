import { BusinessType } from "@/constants/business-type";

type Props = {
  businessType: BusinessType;
};

export default function BusinessSubTitle({ businessType }: Props) {
  return (
    <div className="mt-[72px] lg:mt-20 flex flex-col justify-center items-center">
      <h3 className="text-[20px] lg:text-[45px] font-semibold mt-2 text-center">
        {businessType.mainTitle}
      </h3>
    </div>
  );
}

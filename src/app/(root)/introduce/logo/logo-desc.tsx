import { cn } from "@/lib/utils";

type Props = {
  number: number;
  description: string;
};

export default function LogoDesc({ number, description }: Props) {
  return (
    <div className="flex flex-row gap-4">
      <div
        className={cn(
          "text-klea_text_primary text-sm font-bold",
          "rounded-md border-klea_text_primary border-[2.5px] self-start mt-1",
          "min-w-[25px] w-[25px] px-1.5 flex justify-center items-center"
        )}
      >
        {number}
      </div>
      <p className="font-medium text-[15px] lg:text-[18px] text-[#555555] max-">
        {description}
      </p>
    </div>
  );
}

import { cn } from "@/lib/utils";

type Props = {
  name: string;
  description: string[];
  classname?: string;
};

export default function OrganizationDept({
  description,
  name,
  classname,
}: Props) {
  return (
    <div className={cn("flex flex-row min-w-max", classname)}>
      <div
        className={cn(
          "bg-[#F2F4F9] flex justify-center items-center min-w-[180px] lg:min-w-[360px] font-semibold",
          "text-[18px] lg:text-2xl"
        )}
      >
        {name}
      </div>
      <div className="py-6 px-8 lg:py-8 lg:px-12">
        <ul className="w-[400px] lg:w-full list-square flex flex-col font-normal text-[15px] gap-3 lg:text-[18px] lg:gap-5 text-[#333333]">
          {description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

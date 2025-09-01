import { cn } from "@/lib/utils";

type Props = {
  title: string;
  classname?: string;
};

export default function SubTitle({ title, classname }: Props) {
  return (
    <h2 className={cn("text-[26px] lg:text-[43px] font-bold", classname)}>
      {title}
    </h2>
  );
}

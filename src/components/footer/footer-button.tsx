import { cn } from "@/lib/utils";

type Props = {
  title: string;
  classname?: string;
};

export default function FooterButton({ title, classname }: Props) {
  return (
    <button
      className={cn(
        "border-[1.27px] border-white/30 rounded-[27px] text-center",
        "transition-all duration-500 overflow-hidden relative z-10",
        "before:absolute before:-left-[160%] before:top-0 before:w-[150%] before:h-full before:bg-white",
        "before:skew-x-[140deg] before:transition-all before:-z-10 before:duration-500",
        "hover:text-black focus:text-black hover:bg-white focus:bg-white",
        "btn-before-animation",
        "text-sm lg:text-[15px] px-3 lg:px-[18px] py-[10px] w-full lg:w-auto",
        classname
      )}
    >
      {title}
    </button>
  );
}

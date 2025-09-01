import { cn } from "@/lib/utils";

type Props = {
  title: string;
};

export default function MainBoardTitle({ title }: Props) {
  return (
    <h2
      className={cn(
        "flex-none font-bold",
        "pc xl:ml-0 xl:mr-auto xl:text-3xl",
        "mobile mx-auto text-2xl"
      )}
    >
      {title}
    </h2>
  );
}

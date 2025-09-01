import { cn } from "@/lib/utils";

type Props = {
  strongText: string;
  normalText: string;
};

export default function MainTitle({ normalText, strongText }: Props) {
  return (
    <div className="text-center lg:text-start">
      <span className={cn("font-bold", "pc lg:text-4xl", "mobile text-3xl")}>
        <span className="text-klea_text_primary">{strongText}</span>
        {normalText}
      </span>
    </div>
  );
}

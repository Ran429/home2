import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function DottedDivider({ className }: Props) {
  return (
    <div
      className={cn("w-full border-t border-black border-dotted", className)}
    ></div>
  );
}

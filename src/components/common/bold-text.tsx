import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  className?: string;
  children?: ReactNode;
};

export default function BoldText({ className, children }: Props) {
  return <span className={cn("font-bold", className)}>{children}</span>;
}

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

/**
 * 공통으로 사용하는 상세 페이지에서
 * section 을 정의합니다.
 * @returns
 */
export default function CommonDetailSection({ children }: Props) {
  return (
    <section
      className={cn(
        "container px-5 container:px-0",
        "pc lg:mt-[71px]",
        "mobile mt-28"
      )}
    >
      {children}
    </section>
  );
}

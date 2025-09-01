import { cn } from "@/lib/utils";
import MainBoardTitle from "./main-board-title";
import { Skeleton } from "@/components/ui/skeleton";

export default function MainBoardSkeleton() {
  return (
    <section
      className={cn(
        "w-full container flex px-4",
        "pc lg:mt-20 lg:gap-4 lg:flex-row",
        "mobile mt-14 gap-10 flex-col"
      )}
    >
      <article
        className={cn(
          "border-klea_box_border border py-10 flex-1 rounded-xl flex flex-col",
          "pc lg:px-8",
          "mobile px-6"
        )}
      >
        <div
          className={cn(
            "flex items-center",
            "pc xl:flex-row xl:justify-start",
            "mobile flex-col justify-center gap-6"
          )}
        >
          <MainBoardTitle title="KLEA 소식" />
          <Skeleton className="w-full h-7" />
        </div>

        <ul className="mt-11">
          <li className="flex flex-row justify-start items-center">
            <Skeleton className="w-full h-6" />
          </li>
          <li className="h-px border-dotted border border-[#DDDDDD] my-5" />
          <li className="flex flex-row justify-start items-center">
            <Skeleton className="w-full h-6" />
          </li>
          <li className="h-px border-dotted border border-[#DDDDDD] my-5" />
          <li className="flex flex-row justify-start items-center">
            <Skeleton className="w-full h-6" />
          </li>
          <li className="h-px border-dotted border border-[#DDDDDD] my-5" />
          <li className="flex flex-row justify-start items-center">
            <Skeleton className="w-full h-6" />
          </li>
          <li className="h-px border-dotted border border-[#DDDDDD] my-5" />
          <li className="flex flex-row justify-start items-center">
            <Skeleton className="w-full h-6" />
          </li>
          <li className="h-px border-dotted border border-[#DDDDDD] my-5" />
        </ul>
      </article>

      <article
        className={cn(
          "border-klea_box_border border py-10 flex-1 rounded-xl flex flex-col",
          "pc lg:px-8",
          "mobile px-6"
        )}
      >
        <div
          className={cn(
            "flex items-center",
            "pc xl:flex-row xl:justify-start",
            "mobile flex-col justify-center gap-6"
          )}
        >
          <MainBoardTitle title="정보자료" />
          <Skeleton className="w-full h-7" />
        </div>

        <ul className="mt-11">
          <li className="flex flex-row justify-start items-center">
            <Skeleton className="w-full h-6" />
          </li>
          <li className="h-px border-dotted border border-[#DDDDDD] my-5" />
          <li className="flex flex-row justify-start items-center">
            <Skeleton className="w-full h-6" />
          </li>
          <li className="h-px border-dotted border border-[#DDDDDD] my-5" />
          <li className="flex flex-row justify-start items-center">
            <Skeleton className="w-full h-6" />
          </li>
          <li className="h-px border-dotted border border-[#DDDDDD] my-5" />
          <li className="flex flex-row justify-start items-center">
            <Skeleton className="w-full h-6" />
          </li>
          <li className="h-px border-dotted border border-[#DDDDDD] my-5" />
          <li className="flex flex-row justify-start items-center">
            <Skeleton className="w-full h-6" />
          </li>
          <li className="h-px border-dotted border border-[#DDDDDD] my-5" />
        </ul>
      </article>
    </section>
  );
}

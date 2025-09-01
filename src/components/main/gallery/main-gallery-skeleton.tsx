import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default async function MainGallerySkeleton() {
  return (
    <article className="flex-1">
      <div className="text-center lg:text-start">
        <span className={cn("font-bold", "pc lg:text-4xl", "mobile text-3xl")}>
          <strong className="text-klea_text_primary">KLEA</strong>갤러리
        </span>
      </div>

      <div
        className={cn(
          "mt-5 flex gap-3",
          "pc lg:flex-row",
          "mobile flex-col h-full"
        )}
      >
        <Skeleton className="flex-1 rounded-xl flex justify-end flex-col text-white relative max-h-[300px] aspect-[2/1]" />
        <Skeleton className="flex-1 rounded-xl flex justify-end flex-col text-white relative max-h-[300px] aspect-[2/1]" />
        <Skeleton className="flex-1 rounded-xl flex justify-end flex-col text-white relative max-h-[300px] aspect-[2/1]" />
      </div>
    </article>
  );
}

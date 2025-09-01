import { cn } from "@/lib/utils";
import { DialogClose } from "../ui/dialog";

/**
 * 다이얼로그 닫기 버튼
 */
export default function DialogCloseButton() {
  return (
    <DialogClose
      className={cn(
        "ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
        "mx-auto bg-white rounded-[30px] !mt-7 border-klea_text_primary border text-klea_text_primary max-w-[282px] font-bold",
        "w-2/3 lg:w-1/2 py-3 lg:py-3 text-base lg:text-[22px]"
      )}
    >
      닫기
    </DialogClose>
  );
}

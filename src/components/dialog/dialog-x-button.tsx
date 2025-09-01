import { X } from "lucide-react";
import { DialogClose } from "../ui/dialog";

/**
 * 공통 다이얼로그 X (닫기) 버튼
 * @returns
 */
export default function DialogXButton() {
  return (
    <DialogClose className="rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
      <X className="size-7" />
      <span className="sr-only">Close</span>
    </DialogClose>
  );
}

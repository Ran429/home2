import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { ChevronRight, X } from "lucide-react";
import DialogCloseButton from "../dialog/dialog-close-button";

export default function HakgudoInfoServiceDialog() {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "border border-[#333333] rounded-md flex flex-row justify-between text-[#333333] text-xl font-semibold",
          "py-2 lg:py-4 px-4 text-base lg:px-6 gap-8 lg:gap-14 lg:text-xl",
          HOVER_CLASSNAME
        )}
      >
        주요기능
        <ChevronRight />
      </DialogTrigger>
      <DialogContent className="bg-klea_bg_gray">
        <DialogHeader>
          <div className="flex flex-row justify-between">
            <DialogTitle>학구도 관리시스템 주요기능</DialogTitle>
            <DialogClose className="rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="size-7" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          <DialogDescription
            className={cn(
              "bg-white px-6 py-7 !mt-6 text-[#555555] min-h-[200px] max-h-[300px] overflow-y-auto",
              "text-sm lg:text-base"
            )}
          >
            학구도 소개 및 법령ㆍ제도 안내
            <br /> 학교 및 학구(통학구역) 조회
            <br /> 학구도 공공데이터 정보 제공
          </DialogDescription>

          <DialogCloseButton />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

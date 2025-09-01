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

export default function HakgudoSystemDialog() {
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
            <DialogTitle>학구도 안내서비스 주요기능</DialogTitle>
            <DialogClose className="rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="size-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          <DialogDescription
            className={cn(
              "bg-white px-6 py-7 !mt-6 text-[#555555] min-h-[200px] max-h-[300px] overflow-y-auto",
              "text-sm lg:text-base"
            )}
          >
            학교 및 학구(통학구역) 현황 정보 관리
            <br />
            학구(신설/변경/폐지) 온라인 등록 및 관리
            <br />
            업무담당자를 위한 지리정보서비스(GIS) 제공
            <br /> 학교, 학구, 인구 분포현황 분석 및 통계 산출
          </DialogDescription>
          <DialogCloseButton />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

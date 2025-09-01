import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import DialogCloseButton from "../dialog/dialog-close-button";
import DialogXButton from "../dialog/dialog-x-button";

export default function SupportSystemDialog() {
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
            <DialogTitle>학생배치ㆍ학교설립 지원시스템 주요기능</DialogTitle>
            <DialogXButton />
          </div>

          <DialogDescription
            className={cn(
              "bg-white px-6 py-7 !mt-6 text-[#555555] min-h-[200px] max-h-[300px] overflow-y-auto",
              "text-[15px] lg:text-base break-keep"
            )}
          >
            재정투자심사 온라인 제출ㆍ접수 및 사업 이력 관리
            <br /> 심사 이력 분석 및 다양한 통계 정보 제공
            <br /> 학교설립 계획 적정성 검토를 위한 GIS 기반 분석
            <br /> 학교, 학구, 인구 분포현황 분석 및 통계 산출
          </DialogDescription>

          <DialogCloseButton />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

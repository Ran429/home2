import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import DialogXButton from "../dialog/dialog-x-button";
import FooterButton from "./footer-button";

type Props = {
  content: string;
};

export default function CopyrightPolicyDialog({ content }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FooterButton title="저작권 보호정책" />
      </DialogTrigger>
      <DialogContent className="bg-muted">
        <DialogHeader>
          <div className="flex flex-row justify-between">
            <DialogTitle>저작권 보호정책</DialogTitle>
            <DialogXButton />
          </div>

          <DialogDescription
            className={cn(
              "bg-white px-6 py-7 !mt-6 text-[#555555] min-h-[300px] max-h-[400px] overflow-y-auto",
              "text-[15px] lg:text-base break-keep"
            )}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <DialogClose
            className={cn(
              "ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
              "mx-auto w-1/2 bg-white py-3 rounded-3xl !mt-8 border-klea_text_primary border text-klea_text_primary max-w-xs text-[22px] font-bold"
            )}
          >
            닫기
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

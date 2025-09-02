import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import DialogCloseButton from "../dialog/dialog-close-button";
import DialogXButton from "../dialog/dialog-x-button";
import FooterButton from "./footer-button";

type Props = {
  content: string;
};

export default function EmailPolicyDialog({ content }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FooterButton title="이메일 무단수집 거부" />
      </DialogTrigger>
      <DialogContent className="bg-muted">
        <DialogHeader>
          <div className="flex flex-row items-center justify-between">
            <DialogTitle>이메일 무단수집 거부</DialogTitle>
            <DialogXButton />
          </div>

          <DialogDescription
            className={cn(
              "bg-white px-6 py-7 !mt-6 text-[#555555] min-h-[300px] max-h-[400px] overflow-y-auto",
              "text-[15px] lg:text-base break-keep"
            )}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <DialogCloseButton />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

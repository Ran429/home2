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

export default function PrivacyPolicyDialog({ content }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FooterButton
          title="개인정보처리방침"
          classname="!bg-klea_text_primary !border-none"
        />
      </DialogTrigger>
      <DialogContent className="bg-klea_bg_gray">
        <DialogHeader>
          <div className="flex flex-row justify-between">
            <DialogTitle>개인정보처리방침</DialogTitle>
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

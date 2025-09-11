// src/components/footer/privacy-policy-dialog.tsx

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
          // `hvri_primary` 색상을 사용하는 새로운 클래스로 변경
          classname="!text-black !border-none" 
        />
      </DialogTrigger>
      <DialogContent className="bg-muted">
        <DialogHeader>
          <div className="flex flex-row justify-between">
            <DialogTitle>개인정보처리방침</DialogTitle>
            <DialogXButton />
          </div>

          <DialogDescription
            className={cn(
              "bg-background px-6 py-7 !mt-6 text-foreground min-h-[300px] max-h-[400px] overflow-y-auto",
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
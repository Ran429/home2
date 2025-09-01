import RepresentiveBackground from "@/components/common/represent-background";
import { getDialogType } from "@/constants/dialog.const";
import { cn } from "@/lib/utils";
import { getConfigValue } from "@/server/prisma/config.db";
import { notFound } from "next/navigation";
import UpdateDialogForm from "./update-form";

type Props = {
  params: {
    dialog_key?: string;
  };
};

export default async function AdminPopupUpdatePage({
  params: { dialog_key },
}: Props) {
  if (!dialog_key) {
    notFound();
  }
  const dialogValue = await getConfigValue(dialog_key);
  const dialogType = getDialogType(dialog_key);
  if (!dialogType || !dialogValue) {
    notFound();
  }

  return (
    <>
      <RepresentiveBackground
        type="board"
        rewriteText="사이트 관리"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <h1 className="text-3xl font-bold">팝업 수정 - {dialogType.text}</h1>
        <UpdateDialogForm configValue={dialogValue} />
      </section>
    </>
  );
}

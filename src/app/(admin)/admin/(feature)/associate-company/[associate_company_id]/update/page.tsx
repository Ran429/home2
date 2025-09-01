import RepresentiveBackground from "@/components/common/represent-background";
import { cn } from "@/lib/utils";
import AssociateCompanyDB from "@/server/prisma/associate-company.db";
import { notFound } from "next/navigation";
import UpdateAssociateCompanyForm from "./update-form";

type Props = {
  params: {
    associate_company_id?: string;
  };
};

export default async function AdminAssociateCompanyUpdatePage({
  params: { associate_company_id },
}: Props) {
  const associateCompanyId = Number(associate_company_id);
  if (!associateCompanyId || Number.isNaN(associateCompanyId)) {
    return notFound();
  }

  const associateCompany = await AssociateCompanyDB.findById(
    associateCompanyId
  );
  if (!associateCompany) {
    return notFound();
  }

  return (
    <>
      <RepresentiveBackground
        type="business"
        rewriteText="연관사이트 관리"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">연관사이트 관리 - 수정</h1>
        </div>

        <UpdateAssociateCompanyForm associateCompany={associateCompany} />
      </section>
    </>
  );
}

import RepresentiveBackground from "@/components/common/represent-background";
import { cn } from "@/lib/utils";
import CreateAssociateCompanyForm from "./create-form";

type Props = {};

export default async function AdminAssociateCompanyCreatePage({}: Props) {
  return (
    <>
      <RepresentiveBackground
        type="business"
        rewriteText="연관사이트 관리"
        className="mt-[100px]"
      />
      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">연관사이트 관리 - 추가</h1>
        </div>

        <CreateAssociateCompanyForm />
      </section>
    </>
  );
}

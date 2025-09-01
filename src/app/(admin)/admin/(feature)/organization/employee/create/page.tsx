import RepresentiveBackground from "@/components/common/represent-background";
import { cn } from "@/lib/utils";
import CreateEmployeeForm from "./create-form";

type Props = {};

export default async function AdminEmployeeCreatePage({}: Props) {
  return (
    <>
      <RepresentiveBackground
        type="introduce"
        rewriteText="구성원 관리"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">구성원 관리 - 추가</h1>
        </div>

        <CreateEmployeeForm />
      </section>
    </>
  );
}

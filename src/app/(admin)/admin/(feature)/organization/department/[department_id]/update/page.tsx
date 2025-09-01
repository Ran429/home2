import RepresentiveBackground from "@/components/common/represent-background";
import { cn } from "@/lib/utils";
import DepartmentDB from "@/server/prisma/department.db";
import { notFound } from "next/navigation";
import UpdateDepartmentForm from "./update-form";

type Props = {
  params: {
    department_id?: string;
  };
};

export default async function AdminDepartmentUpdatePage({
  params: { department_id },
}: Props) {
  const employeeId = Number(department_id);
  if (!employeeId || Number.isNaN(employeeId)) {
    return notFound();
  }

  const department = await DepartmentDB.findById(employeeId);
  if (!department) {
    return notFound();
  }

  return (
    <>
      <RepresentiveBackground
        type="introduce"
        rewriteText="구성원 관리"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">부서 관리 - 수정</h1>
        </div>

        <UpdateDepartmentForm department={department} />
      </section>
    </>
  );
}

import RepresentiveBackground from "@/components/common/represent-background";
import { cn } from "@/lib/utils";
import EmployeeDB from "@/server/prisma/employee.db";
import { notFound } from "next/navigation";
import UpdateEmployeeForm from "./update-form";

type Props = {
  params: {
    employee_id?: string;
  };
};

export default async function AdminEmployeeUpdatePage({
  params: { employee_id },
}: Props) {
  const employeeId = Number(employee_id);
  if (!employeeId || Number.isNaN(employeeId)) {
    return notFound();
  }

  const employee = await EmployeeDB.findById(employeeId);
  if (!employee) {
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
          <h1 className="text-3xl font-bold">구성원 관리 - 수정</h1>
        </div>

        <UpdateEmployeeForm employee={employee} />
      </section>
    </>
  );
}

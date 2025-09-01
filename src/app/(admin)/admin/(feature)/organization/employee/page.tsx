import RepresentiveBackground from "@/components/common/represent-background";
import { cn } from "@/lib/utils";
import EmployeeDB from "@/server/prisma/employee.db";
import Link from "next/link";
import DeleteEmployeeButton from "./(delete)/button";
import AdminOrganizationTabs from "@/components/admin/admin-organization-tabs";

export default async function AdminEmployeePage() {
  const employees = await EmployeeDB.findAllActive();

  return (
    <>
      <RepresentiveBackground
        type="introduce"
        rewriteText="구성원 관리"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <AdminOrganizationTabs isEmployee />

        <div className="flex flex-row justify-between items-center mt-10">
          <h1 className="text-3xl font-bold">구성원 관리</h1>
          <Link
            href="/admin/organization/employee/create"
            className="daisy-btn daisy-btn-primary"
          >
            추가
          </Link>
        </div>
        <div className="w-full overflow-x-auto mt-10">
          <table className="daisy-table">
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="" />
              <col width="15%" />
              <col width="15%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr className="*:text-center *:text-[18px]">
                <th>성명</th>
                <th>직책</th>
                <th>업무</th>
                <th>전화번호</th>
                <th>부서</th>
                <th>정렬순서</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="text-center">
                  <td>{employee.name}</td>
                  <td>{employee.responsibility}</td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: employee.works.replaceAll("\n", "<br />"),
                    }}
                  ></td>
                  <td>{employee.phoneNumber}</td>
                  <td>{employee.department}</td>
                  <td>{employee.sortOrder}</td>
                  <td>
                    <Link
                      href={`/admin/organization/employee/${employee.id}/update`}
                      className="daisy-btn daisy-btn-secondary"
                    >
                      수정
                    </Link>
                  </td>
                  <td>
                    <DeleteEmployeeButton employeeId={employee.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

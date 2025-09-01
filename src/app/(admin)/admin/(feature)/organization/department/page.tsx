import AdminOrganizationTabs from "@/components/admin/admin-organization-tabs";
import RepresentiveBackground from "@/components/common/represent-background";
import { cn } from "@/lib/utils";
import DepartmentDB from "@/server/prisma/department.db";
import Link from "next/link";
import DeleteDepartmentButton from "./(delete)/button";

export default async function AdminDepartmentPage() {
  const departments = await DepartmentDB.findAllActive();

  return (
    <>
      <RepresentiveBackground
        type="introduce"
        rewriteText="부서 관리"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <AdminOrganizationTabs isDepartment />

        <div className="flex flex-row justify-between items-center mt-10">
          <h1 className="text-3xl font-bold">부서 관리</h1>
          <Link
            href="/admin/organization/department/create"
            className="daisy-btn daisy-btn-primary"
          >
            추가
          </Link>
        </div>

        <div className="w-full overflow-x-auto mt-10">
          <table className="daisy-table">
            <colgroup>
              <col width="15%" />
              <col width="" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr className="*:text-center *:text-[18px]">
                <th>이름</th>
                <th>업무</th>
                <th>정렬순서</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.id} className="text-center">
                  <td>{department.name}</td>

                  <td
                    dangerouslySetInnerHTML={{
                      __html: department.works.replaceAll("\n", "<br />"),
                    }}
                  />

                  <td>{department.sortOrder}</td>
                  <td>
                    <Link
                      href={`/admin/organization/department/${department.id}/update`}
                      className="daisy-btn daisy-btn-secondary"
                    >
                      수정
                    </Link>
                  </td>
                  <td>
                    <DeleteDepartmentButton departmentId={department.id} />
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

"use client";

import SubTitle from "@/components/common/sub-title";
import DeptSearchTab from "@/components/introduce/organization/dept-search-tab";
import OrganizationSearch from "@/components/introduce/organization/organization-search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmpoloyeeSearchType } from "@/constants/employee-search-type";
import useHash from "@/hooks/use-hash";
import { cn } from "@/lib/utils";
import { Department, Employee } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  employees: Employee[];
  departments: Department[];
};

export default function DepartmentsAndEmployees({
  departments,
  employees,
}: Props) {
  const hash = useHash();
  const searchParams = useSearchParams();

  const [selectedEmployees, setSelectedEmployees] =
    useState<Employee[]>(employees);

  useEffect(() => {
    handleSearch(hash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, searchParams]);

  function handleSearch(hash: string) {
    const targetDept = departments.find((dept) => "#" + dept.id === hash);

    const searchType = searchParams.get("search_type");
    const keyword = searchParams.get("keyword");
    const searchAll = searchType === "all";

    let targetEmployees = employees;
    if (!searchAll && targetDept) {
      targetEmployees = targetEmployees.filter(
        (employee) => employee.department === targetDept.name
      );
    }

    if (searchType && keyword) {
      if (searchType === EmpoloyeeSearchType.NAME.code) {
        targetEmployees = targetEmployees.filter((employee) =>
          employee.name.includes(keyword)
        );
      } else if (searchType === EmpoloyeeSearchType.JOB_GRADE.code) {
        targetEmployees = targetEmployees.filter((employee) =>
          employee.responsibility.includes(keyword)
        );
      } else if (searchType === EmpoloyeeSearchType.DEPT.code) {
        targetEmployees = targetEmployees.filter((employee) =>
          employee.department.includes(keyword)
        );
      } else if (searchType === EmpoloyeeSearchType.PHONE_NUMBER.code) {
        targetEmployees = targetEmployees.filter((employee) =>
          employee.phoneNumber.includes(keyword)
        );
      } else if (searchType === EmpoloyeeSearchType.ALL.code) {
        targetEmployees = targetEmployees.filter((employee) => {
          return (
            employee.name.includes(keyword) ||
            employee.responsibility.includes(keyword) ||
            employee.department.includes(keyword) ||
            employee.phoneNumber.includes(keyword)
          );
        });
      }
    }

    setSelectedEmployees(targetEmployees);
  }

  return (
    <>
      <div className="mt-14 lg:mt-32">
        <SubTitle title="직원 검색" />
        <OrganizationSearch currentHash={hash} />
      </div>

      <div className="mt-14 lg:mt-32">
        <SubTitle title="부서별 구성원" />
        <DeptSearchTab departments={departments} currentHash={hash} />

        <Table className="mt-5">
          <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="" />
            <col width="15%" />
            <col width="15%" />
          </colgroup>

          <TableHeader>
            <TableRow
              className={cn(
                "*:bg-[#F7F8FB] *:outline *:outline-1 *:outline-[#EEEEEE] *:text-center *:font-bold *:text-black",
                "text-base *:py-3 lg:*:text-xl lg:*:py-5"
              )}
            >
              <TableHead>성명</TableHead>
              <TableHead>직책</TableHead>
              <TableHead className="min-w-[200px]">업무</TableHead>
              <TableHead>부서</TableHead>
              <TableHead>전화번호</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {selectedEmployees.length > 0 ? (
              selectedEmployees.map((employee) => (
                <TableRow
                  key={employee.responsibility + "_" + employee.name}
                  className="text-[#333333] text-[15px] lg:text-[18px] text-normal *:py-3 lg:*:py-5"
                >
                  <TableCell className="text-center">{employee.name}</TableCell>
                  <TableCell className="text-center">
                    {employee.responsibility}
                  </TableCell>
                  <TableCell className="text-center">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: employee.works.replaceAll("\n", "<br />"),
                      }}
                      className="min-w-72"
                    ></div>
                  </TableCell>
                  <TableCell className="text-center">
                    {employee.department}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="min-w-28">{employee.phoneNumber}</div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center border-b border-[#EEEEEE] py-8"
                >
                  <span className="text-base">일치하는 구성원이 없습니다</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

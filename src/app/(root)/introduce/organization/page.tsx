import CommonBreadcrumb from "@/components/common/common-breadcrumb";
import CommonDetailSection from "@/components/common/common-detail-section";
import RepresentiveBackground from "@/components/common/represent-background";
import SubTitle from "@/components/common/sub-title";
import IntroduceTab from "@/components/introduce/introduce-tab";
import OrganizationDept from "@/components/introduce/organization/organization-dept";
import { Skeleton } from "@/components/ui/skeleton";
import { CommonMetadata } from "@/constants/common-metadata";
import { IntroduceType } from "@/constants/introduce-type";
import { cn } from "@/lib/utils";
import DepartmentDB from "@/server/prisma/department.db";
import EmployeeDB from "@/server/prisma/employee.db";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import DepartmentsAndEmployees from "./deparments-and-employees";
import ClientFileUtil from "@/lib/client-file-util";
import dayjs from "dayjs";

export const metadata: Metadata = {
  ...CommonMetadata,
  title: "조직 및 업무 | 한국지방교육행정연구재단",
  description: "재단법인 한국지방교육행정연구재단 조직도",
};

type Props = {};

export default async function IntroducePage({}: Props) {
  const introduceType = IntroduceType.ORGANIZATION;

  return (
    <>
      <CommonBreadcrumb
        breadcrumbs={introduceType.breadcrumbs}
        hiddenInMobile
      />

      <RepresentiveBackground type="introduce" />

      <CommonDetailSection>
        <IntroduceTab introduceType={introduceType} />

        <div className="mt-14 gap-12 lg:mt-32 lg:gap-32 flex flex-col justify-center items-center">
          <Image
            src={ClientFileUtil.getStaticFileUrl(
              "images/bg_organization.jpg?v=" + dayjs().unix()
            )}
            width={0}
            height={0}
            sizes="100vw"
            alt="bg_organization"
            className="w-full aspect-auto"
            priority
            loading="eager"
            quality={100}
          />

          <div className="w-full">
            <SubTitle title="팀별 조직 및 업무" />

            <Suspense
              fallback={
                <Skeleton className="w-full overflow-x-auto lg:overflow-x-hidden mt-10 lg:mt-14 min-h-[500px]" />
              }
            >
              <DepartmentHelper />
            </Suspense>
          </div>
        </div>

        <Suspense
          fallback={
            <Skeleton className="mt-14 lg:mt-32 animate-pulse min-h-[300px]" />
          }
        >
          <DeartmentsAndEmployeesHelper />
        </Suspense>
      </CommonDetailSection>
    </>
  );
}

async function DepartmentHelper() {
  const departments = await DepartmentDB.findAllActive();

  return (
    <div className="w-full overflow-x-auto lg:overflow-x-hidden mt-10 lg:mt-14 min-h-[500px]">
      {departments.map((dept, index) => (
        <OrganizationDept
          key={index}
          name={dept.name}
          description={dept.works.split("\n")}
          classname={cn(
            index === 0 ? "" : "",
            index === departments.length - 1 ? "border-b" : "",
            "border-t border-l border-r border-[#EEEEEE]"
          )}
        />
      ))}
    </div>
  );
}

async function DeartmentsAndEmployeesHelper() {
  const employees = await EmployeeDB.findAllActive();
  const departments = await DepartmentDB.findAllActive();

  return (
    <DepartmentsAndEmployees departments={departments} employees={employees} />
  );
}

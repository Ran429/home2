import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  isDepartment?: boolean;
  isEmployee?: boolean;
};

export default function AdminOrganizationTabs({
  isDepartment,
  isEmployee,
}: Props) {
  return (
    <div role="tablist" className="daisy-tabs daisy-tabs-boxed">
      <Link
        role="tab"
        className={cn("daisy-tab", isDepartment ? "daisy-tab-active" : "")}
        href="/admin/organization/department"
      >
        부서 관리
      </Link>
      <Link
        role="tab"
        className={cn("daisy-tab", isEmployee ? "daisy-tab-active" : "")}
        href="/admin/organization/employee"
      >
        구성원 관리
      </Link>
    </div>
  );
}

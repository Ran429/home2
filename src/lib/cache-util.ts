import { revalidatePath } from "next/cache";

function revalidateBoardPages() {
  revalidatePath("/admin/board", "layout");
  revalidatePath("/board", "layout");
  revalidatePath("/");
}

function revalidateEmployeePages() {
  revalidatePath("/admin/organization/employee", "layout");
  revalidatePath("/introduce/organization");
}

function revalidateDepartmentPages() {
  revalidatePath("/admin/organization/department", "layout");
  revalidatePath("/introduce/organization");
}

function revalidateAdminMaintenanceBoardPages() {
  revalidatePath("/admin/maintenance", "layout");
}

const CacheUtil = {
  revalidateBoardPages,
  revalidateEmployeePages,
  revalidateDepartmentPages,
  revalidateAdminMaintenanceBoardPages,
};

export default CacheUtil;

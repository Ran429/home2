import { UpdateDepartmentSchema } from "@/app/(admin)/admin/(feature)/organization/department/[department_id]/update/schema";
import { CreateDepartmentSchema } from "@/app/(admin)/admin/(feature)/organization/department/create/schema";
import { z } from "zod";
import { prisma } from "./prisma.client";

async function create({
  name,
  sort_order,
  works,
}: z.infer<typeof CreateDepartmentSchema>) {
  return prisma.department.create({
    data: {
      name,
      works,
      sortOrder: sort_order,
    },
  });
}

async function findById(departmentId: number) {
  return prisma.department.findUnique({
    where: {
      id: departmentId,
      isActive: true,
    },
  });
}

async function findAllActive() {
  return prisma.department.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}

async function update({
  department_id,
  name,
  works,
  sort_order,
}: z.infer<typeof UpdateDepartmentSchema>) {
  return prisma.department.update({
    data: {
      name,
      works,
      sortOrder: sort_order,
    },
    where: {
      id: department_id,
    },
  });
}

async function deleteOne(id: number) {
  // soft delete
  return prisma.department.update({
    data: {
      isActive: false,
    },
    where: {
      id,
    },
  });
}

const DepartmentDB = {
  findById,
  findAllActive,
  create,
  update,
  deleteOne,
};

export default DepartmentDB;

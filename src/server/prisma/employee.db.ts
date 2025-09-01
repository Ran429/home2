import { UpdateEmployeeSchema } from "@/app/(admin)/admin/(feature)/organization/employee/[employee_id]/update/schema";
import { CreateEmployeeSchema } from "@/app/(admin)/admin/(feature)/organization/employee/create/schema";
import { z } from "zod";
import { prisma } from "./prisma.client";

async function create({
  department,
  name,
  phone_number,
  responsibility,
  sort_order,
  works,
}: z.infer<typeof CreateEmployeeSchema>) {
  return prisma.employee.create({
    data: {
      department,
      name,
      phoneNumber: phone_number,
      responsibility,
      works,
      sortOrder: sort_order,
    },
  });
}

async function findById(employeeId: number) {
  return prisma.employee.findUnique({
    where: {
      id: employeeId,
      isActive: true,
    },
  });
}

async function findAllActive() {
  return prisma.employee.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}

async function update({
  department,
  employee_id,
  name,
  phone_number,
  responsibility,
  works,
  sort_order,
}: z.infer<typeof UpdateEmployeeSchema>) {
  return prisma.employee.update({
    data: {
      department,
      name,
      phoneNumber: phone_number,
      responsibility,
      works,
      sortOrder: sort_order,
    },
    where: {
      id: employee_id,
    },
  });
}

async function deleteOne(employeeId: number) {
  // soft delete
  return prisma.employee.update({
    data: {
      isActive: false,
    },
    where: {
      id: employeeId,
    },
  });
}

const EmployeeDB = {
  findById,
  findAllActive,
  create,
  update,
  deleteOne,
};

export default EmployeeDB;

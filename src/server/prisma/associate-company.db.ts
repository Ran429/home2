import { UploadFile } from "@/@types/upload-file";
import { UpdateAssociateCompanySchema } from "@/app/(admin)/admin/(feature)/associate-company/[associate_company_id]/update/schema";
import { CreateAssociateCompanySchema } from "@/app/(admin)/admin/(feature)/associate-company/create/schema";
import { z } from "zod";
import { prisma } from "./prisma.client";

async function create(
  {
    link,
    sort_order,
    description,
  }: z.infer<typeof CreateAssociateCompanySchema>,
  image: UploadFile[]
) {
  return prisma.associateCompany.create({
    data: {
      image,
      link,
      sortOrder: sort_order,
      description,
      isActive: true,
    },
  });
}

async function findById(associateCompanyId: number) {
  return prisma.associateCompany.findUnique({
    where: {
      id: associateCompanyId,
      isDeleted: false,
    },
  });
}

async function findAll() {
  return prisma.associateCompany.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}

async function findAllActive() {
  return prisma.associateCompany.findMany({
    where: {
      isActive: true,
      isDeleted: false,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}

async function update({
  associate_company_id,
  link,
  description,
  sort_order,
  is_active,
}: z.infer<typeof UpdateAssociateCompanySchema>) {
  return prisma.associateCompany.update({
    data: {
      link,
      description,
      sortOrder: sort_order,
      isActive: is_active,
    },
    where: {
      id: associate_company_id,
    },
  });
}

async function deleteOne(employeeId: number) {
  // soft delete
  return prisma.associateCompany.update({
    data: {
      isDeleted: true,
    },
    where: {
      id: employeeId,
    },
  });
}

const AssociateCompanyDB = {
  findById,
  findAll,
  findAllActive,
  create,
  update,
  deleteOne,
};

export default AssociateCompanyDB;

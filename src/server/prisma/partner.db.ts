import { UploadFile } from "@/@types/upload-file";
import { UpdatePartnerSchema } from "@/app/(admin)/admin/(feature)/partner/[partner_id]/update/schema";
import { CreatePartnerSchema } from "@/app/(admin)/admin/(feature)/partner/create/schema";
import { z } from "zod";
import { prisma } from "./prisma.client";

async function create(
  {
    name,
    link,
    sort_order,
    description,
  }: z.infer<typeof CreatePartnerSchema>,
  image: UploadFile[]
) {
  return prisma.partner.create({
    data: {
      name,
      logoImage: image,
      link,
      sortOrder: sort_order,
      description,
      isActive: true,
    },
  });
}

async function findById(partnerId: number) {
  return prisma.partner.findUnique({
    where: {
      id: partnerId,
    },
  });
}

async function findAll() {
  return prisma.partner.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });
}

async function findAllActive() {
  return prisma.partner.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}

async function update({
  partner_id,
  link,
  description,
  sort_order,
  is_active,
}: z.infer<typeof UpdatePartnerSchema>) {
  return prisma.partner.update({
    data: {
      link,
      description,
      sortOrder: sort_order,
      isActive: is_active,
    },
    where: {
      id: partner_id,
    },
  });
}

async function deleteOne(partnerId: number) {
  // hard delete (isDeleted 컬럼이 없으므로 완전 삭제)
  return prisma.partner.delete({
    where: {
      id: partnerId,
    },
  });
}

const PartnerDB = {
  findById,
  findAll,
  findAllActive,
  create,
  update,
  deleteOne,
};

export default PartnerDB;
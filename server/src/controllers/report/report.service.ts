import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const create = async (userId: string, payload: any) => {
  return await prisma.report.create({ data: { ...payload, reporterId: userId } });
};

const getAll = async () => {
  return await prisma.report.findMany();
};

const getById = async (id: string) => {
  return await prisma.report.findUnique({ where: { id } });
};

const update = async (id: string, payload: any) => {
  return await prisma.report.update({ where: { id }, data: payload });
};

const deleteRecord = async (id: string) => {
  return await prisma.report.delete({ where: { id } });
};

export const ReportService = { create, getAll, getById, update, deleteRecord };

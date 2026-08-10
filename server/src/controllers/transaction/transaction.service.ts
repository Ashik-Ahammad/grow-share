import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const create = async (userId: string, payload: any) => {
  return await prisma.transaction.create({ data: { ...payload, buyerId: userId } });
};

const getAll = async () => {
  return await prisma.transaction.findMany();
};

const getById = async (id: string) => {
  return await prisma.transaction.findUnique({ where: { id } });
};

const update = async (id: string, payload: any) => {
  return await prisma.transaction.update({ where: { id }, data: payload });
};

const deleteRecord = async (id: string) => {
  return await prisma.transaction.delete({ where: { id } });
};

export const TransactionService = { create, getAll, getById, update, deleteRecord };

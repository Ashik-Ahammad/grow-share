import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const create = async (userId: string, payload: any) => {
  return await prisma.exchangeRequest.create({ data: { ...payload, requesterId: userId } });
};

const getAll = async () => {
  return await prisma.exchangeRequest.findMany();
};

const getById = async (id: string) => {
  return await prisma.exchangeRequest.findUnique({ where: { id } });
};

const update = async (id: string, payload: any) => {
  return await prisma.exchangeRequest.update({ where: { id }, data: payload });
};

const deleteRecord = async (id: string) => {
  return await prisma.exchangeRequest.delete({ where: { id } });
};

export const ExchangeRequestService = { create, getAll, getById, update, deleteRecord };

import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const create = async (userId: string, payload: any) => {
  return await prisma.notification.create({ data: { ...payload, userId: userId } });
};

const getAll = async () => {
  return await prisma.notification.findMany();
};

const getById = async (id: string) => {
  return await prisma.notification.findUnique({ where: { id } });
};

const update = async (id: string, payload: any) => {
  return await prisma.notification.update({ where: { id }, data: payload });
};

const deleteRecord = async (id: string) => {
  return await prisma.notification.delete({ where: { id } });
};

export const NotificationService = { create, getAll, getById, update, deleteRecord };

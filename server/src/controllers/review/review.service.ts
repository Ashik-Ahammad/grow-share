import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const create = async (userId: string, payload: any) => {
  return await prisma.review.create({ data: { ...payload, reviewerId: userId } });
};

const getAll = async () => {
  return await prisma.review.findMany();
};

const getById = async (id: string) => {
  return await prisma.review.findUnique({ where: { id } });
};

const update = async (id: string, payload: any) => {
  return await prisma.review.update({ where: { id }, data: payload });
};

const deleteRecord = async (id: string) => {
  return await prisma.review.delete({ where: { id } });
};

export const ReviewService = { create, getAll, getById, update, deleteRecord };

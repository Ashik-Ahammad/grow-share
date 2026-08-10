import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const create = async (userId: string, payload: any) => {
  return await prisma.comment.create({ data: { ...payload, userId: userId } });
};

const getAll = async () => {
  return await prisma.comment.findMany();
};

const getById = async (id: string) => {
  return await prisma.comment.findUnique({ where: { id } });
};

const update = async (id: string, payload: any) => {
  return await prisma.comment.update({ where: { id }, data: payload });
};

const deleteRecord = async (id: string) => {
  return await prisma.comment.delete({ where: { id } });
};

export const CommentService = { create, getAll, getById, update, deleteRecord };

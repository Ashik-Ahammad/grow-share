import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const create = async (userId: string, payload: any) => {
  return await prisma.wishlist.create({ data: { ...payload, userId: userId } });
};

const getAll = async () => {
  return await prisma.wishlist.findMany();
};

const getById = async (id: string) => {
  return await prisma.wishlist.findUnique({ where: { id } });
};

const update = async (id: string, payload: any) => {
  return await prisma.wishlist.update({ where: { id }, data: payload });
};

const deleteRecord = async (id: string) => {
  return await prisma.wishlist.delete({ where: { id } });
};

export const WishlistService = { create, getAll, getById, update, deleteRecord };

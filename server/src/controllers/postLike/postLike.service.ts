import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const create = async (userId: string, payload: any) => {
  const existingLike = await prisma.postLike.findFirst({
    where: { postId: payload.postId, userId: userId }
  });
  if (existingLike) {
    await prisma.postLike.delete({ where: { id: existingLike.id } });
    return { status: 'unliked' };
  }
  return await prisma.postLike.create({ data: { ...payload, userId: userId } });
};

const getAll = async () => {
  return await prisma.postLike.findMany();
};

const getById = async (id: string) => {
  return await prisma.postLike.findUnique({ where: { id } });
};

const update = async (id: string, payload: any) => {
  return await prisma.postLike.update({ where: { id }, data: payload });
};

const deleteRecord = async (id: string) => {
  return await prisma.postLike.delete({ where: { id } });
};

export const PostLikeService = { create, getAll, getById, update, deleteRecord };

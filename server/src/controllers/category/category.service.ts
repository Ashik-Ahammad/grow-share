import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const createCategory = async (payload: { name: string; description?: string }) => {
  const isExist = await prisma.category.findUnique({
    where: { name: payload.name },
  });

  if (isExist) {
    throw new AppError(409, "Category already exists!");
  }

  const category = await prisma.category.create({
    data: payload,
  });

  return category;
};

const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: "desc" },
  });
  return categories;
};

const updateCategory = async (id: string, payload: Partial<{ name: string; description: string }>) => {
  const category = await prisma.category.findUnique({ where: { id, isDeleted: false } });
  if (!category) {
    throw new AppError(404, "Category not found");
  }

  const updatedCategory = await prisma.category.update({
    where: { id },
    data: payload,
  });

  return updatedCategory;
};

const deleteCategory = async (id: string) => {
  const category = await prisma.category.findUnique({ where: { id, isDeleted: false } });
  if (!category) {
    throw new AppError(404, "Category not found");
  }

  await prisma.category.update({
    where: { id },
    data: { isDeleted: true },
  });

  return null;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};

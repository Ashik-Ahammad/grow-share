import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const createGarden = async (userId: string, payload: any) => {
  const garden = await prisma.garden.create({
    data: {
      ...payload,
      userId,
    },
  });
  return garden;
};

const getMyGardens = async (userId: string) => {
  const gardens = await prisma.garden.findMany({
    where: { userId, isDeleted: false },
    include: { plants: true },
    orderBy: { createdAt: "desc" },
  });
  return gardens;
};

const getGardenById = async (id: string) => {
  const garden = await prisma.garden.findUnique({
    where: { id, isDeleted: false },
    include: {
      plants: {
        include: {
          plant: true,
          careSchedules: true,
        }
      }
    },
  });

  if (!garden) {
    throw new AppError(404, "Garden not found");
  }

  return garden;
};

const updateGarden = async (id: string, userId: string, payload: any) => {
  const garden = await prisma.garden.findUnique({ where: { id, isDeleted: false } });
  if (!garden) {
    throw new AppError(404, "Garden not found");
  }
  if (garden.userId !== userId) {
    throw new AppError(403, "You can only update your own garden");
  }

  const updatedGarden = await prisma.garden.update({
    where: { id },
    data: payload,
  });

  return updatedGarden;
};

const deleteGarden = async (id: string, userId: string) => {
  const garden = await prisma.garden.findUnique({ where: { id, isDeleted: false } });
  if (!garden) {
    throw new AppError(404, "Garden not found");
  }
  if (garden.userId !== userId) {
    throw new AppError(403, "You can only delete your own garden");
  }

  await prisma.garden.update({
    where: { id },
    data: { isDeleted: true },
  });

  return null;
};

export const GardenService = {
  createGarden,
  getMyGardens,
  getGardenById,
  updateGarden,
  deleteGarden,
};

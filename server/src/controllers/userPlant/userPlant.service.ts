import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const addUserPlant = async (userId: string, payload: any) => {
  const garden = await prisma.garden.findUnique({
    where: { id: payload.gardenId, isDeleted: false },
  });

  if (!garden || garden.userId !== userId) {
    throw new AppError(403, "You can only add plants to your own garden");
  }

  const userPlant = await prisma.userPlant.create({
    data: payload,
    include: { plant: true },
  });

  return userPlant;
};

const updateUserPlant = async (id: string, userId: string, payload: any) => {
  const userPlant = await prisma.userPlant.findUnique({
    where: { id, isDeleted: false },
    include: { garden: true },
  });

  if (!userPlant) {
    throw new AppError(404, "User plant not found");
  }
  if (userPlant.garden.userId !== userId) {
    throw new AppError(403, "You can only update your own plants");
  }

  const updatedPlant = await prisma.userPlant.update({
    where: { id },
    data: payload,
  });

  return updatedPlant;
};

const deleteUserPlant = async (id: string, userId: string) => {
  const userPlant = await prisma.userPlant.findUnique({
    where: { id, isDeleted: false },
    include: { garden: true },
  });

  if (!userPlant) {
    throw new AppError(404, "User plant not found");
  }
  if (userPlant.garden.userId !== userId) {
    throw new AppError(403, "You can only delete your own plants");
  }

  await prisma.userPlant.update({
    where: { id },
    data: { isDeleted: true },
  });

  return null;
};

export const UserPlantService = {
  addUserPlant,
  updateUserPlant,
  deleteUserPlant,
};

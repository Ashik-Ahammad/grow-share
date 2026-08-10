import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const createPlant = async (payload: any) => {
  const plant = await prisma.plant.create({
    data: payload,
  });
  return plant;
};

const getAllPlants = async () => {
  const plants = await prisma.plant.findMany({
    where: { isDeleted: false },
    include: {
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return plants;
};

const getPlantById = async (id: string) => {
  const plant = await prisma.plant.findUnique({
    where: { id, isDeleted: false },
    include: { category: true },
  });

  if (!plant) {
    throw new AppError(404, "Plant not found");
  }

  return plant;
};

const updatePlant = async (id: string, payload: any) => {
  const plant = await prisma.plant.findUnique({ where: { id, isDeleted: false } });
  if (!plant) {
    throw new AppError(404, "Plant not found");
  }

  const updatedPlant = await prisma.plant.update({
    where: { id },
    data: payload,
  });

  return updatedPlant;
};

const deletePlant = async (id: string) => {
  const plant = await prisma.plant.findUnique({ where: { id, isDeleted: false } });
  if (!plant) {
    throw new AppError(404, "Plant not found");
  }

  await prisma.plant.update({
    where: { id },
    data: { isDeleted: true },
  });

  return null;
};

export const PlantService = {
  createPlant,
  getAllPlants,
  getPlantById,
  updatePlant,
  deletePlant,
};

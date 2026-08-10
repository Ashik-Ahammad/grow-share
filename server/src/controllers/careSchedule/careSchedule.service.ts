import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const createCareSchedule = async (userId: string, payload: any) => {
  const userPlant = await prisma.userPlant.findUnique({
    where: { id: payload.userPlantId, isDeleted: false },
    include: { garden: true },
  });

  if (!userPlant || userPlant.garden.userId !== userId) {
    throw new AppError(403, "You can only add schedules to your own plants");
  }

  const schedule = await prisma.careSchedule.create({
    data: payload,
  });

  return schedule;
};

const updateCareSchedule = async (id: string, userId: string, payload: any) => {
  const schedule = await prisma.careSchedule.findUnique({
    where: { id, isDeleted: false },
    include: { userPlant: { include: { garden: true } } },
  });

  if (!schedule) {
    throw new AppError(404, "Care schedule not found");
  }
  if (schedule.userPlant.garden.userId !== userId) {
    throw new AppError(403, "You can only update your own schedules");
  }

  const updatedSchedule = await prisma.careSchedule.update({
    where: { id },
    data: payload,
  });

  return updatedSchedule;
};

const deleteCareSchedule = async (id: string, userId: string) => {
  const schedule = await prisma.careSchedule.findUnique({
    where: { id, isDeleted: false },
    include: { userPlant: { include: { garden: true } } },
  });

  if (!schedule) {
    throw new AppError(404, "Care schedule not found");
  }
  if (schedule.userPlant.garden.userId !== userId) {
    throw new AppError(403, "You can only delete your own schedules");
  }

  await prisma.careSchedule.update({
    where: { id },
    data: { isDeleted: true },
  });

  return null;
};

export const CareScheduleService = {
  createCareSchedule,
  updateCareSchedule,
  deleteCareSchedule,
};

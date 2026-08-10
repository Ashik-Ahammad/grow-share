import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const getMyProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId, isDeleted: false },
    select: {
      id: true,
      email: true,
      name: true,
      bio: true,
      location: true,
      profileImage: true,
      role: true,
      createdAt: true,
    }
  });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  return user;
};

const updateMyProfile = async (userId: string, payload: any) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      id: true,
      email: true,
      name: true,
      bio: true,
      location: true,
      profileImage: true,
      role: true,
    }
  });

  return updatedUser;
};

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id, isDeleted: false },
    select: {
      id: true,
      email: true,
      name: true,
      bio: true,
      location: true,
      profileImage: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          posts: true,
          listings: true,
          gardens: true,
        }
      }
    }
  });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  return user;
};

export const UserService = {
  getMyProfile,
  updateMyProfile,
  getUserById,
};

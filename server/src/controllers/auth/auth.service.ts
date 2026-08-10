import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const register = async (payload: any) => {
  const isExist = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (isExist) {
    throw new AppError(409, "User already exists with this email!");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);

  const newUser = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isEmailVerified: true,
      createdAt: true,
    }
  });

  return newUser;
};

const login = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email, isDeleted: false },
  });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(401, "Invalid password!");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: config.jwt_expires_in as any,
  });

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  };
};

export const AuthService = {
  register,
  login,
};

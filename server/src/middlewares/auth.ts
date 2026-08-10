import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";
import AppError from "../utils/AppError.js";

const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization;
      if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      if (!token) {
        throw new AppError(401, "You are not authorized!");
      }

      const verifiedUser = jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;

      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new AppError(403, "Forbidden!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;

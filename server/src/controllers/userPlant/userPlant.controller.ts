import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { UserPlantService } from "./userPlant.service.js";

const addUserPlant = catchAsync(async (req: Request, res: Response) => {
  const result = await UserPlantService.addUserPlant(req.user.id, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Plant added to garden successfully",
    data: result,
  });
});

const updateUserPlant = catchAsync(async (req: Request, res: Response) => {
  const result = await UserPlantService.updateUserPlant(req.params.id as string, req.user.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User plant updated successfully",
    data: result,
  });
});

const deleteUserPlant = catchAsync(async (req: Request, res: Response) => {
  await UserPlantService.deleteUserPlant(req.params.id as string, req.user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User plant removed from garden successfully",
    data: null,
  });
});

export const UserPlantController = {
  addUserPlant,
  updateUserPlant,
  deleteUserPlant,
};

import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { GardenService } from "./garden.service.js";

const createGarden = catchAsync(async (req: Request, res: Response) => {
  const result = await GardenService.createGarden(req.user.id, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Garden created successfully",
    data: result,
  });
});

const getMyGardens = catchAsync(async (req: Request, res: Response) => {
  const result = await GardenService.getMyGardens(req.user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Gardens retrieved successfully",
    data: result,
  });
});

const getGardenById = catchAsync(async (req: Request, res: Response) => {
  const result = await GardenService.getGardenById(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Garden retrieved successfully",
    data: result,
  });
});

const updateGarden = catchAsync(async (req: Request, res: Response) => {
  const result = await GardenService.updateGarden(req.params.id as string, req.user.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Garden updated successfully",
    data: result,
  });
});

const deleteGarden = catchAsync(async (req: Request, res: Response) => {
  await GardenService.deleteGarden(req.params.id as string, req.user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Garden deleted successfully",
    data: null,
  });
});

export const GardenController = {
  createGarden,
  getMyGardens,
  getGardenById,
  updateGarden,
  deleteGarden,
};

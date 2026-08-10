import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { PlantService } from "./plant.service.js";

const createPlant = catchAsync(async (req: Request, res: Response) => {
  const result = await PlantService.createPlant(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Plant created successfully",
    data: result,
  });
});

const getAllPlants = catchAsync(async (req: Request, res: Response) => {
  const result = await PlantService.getAllPlants();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Plants retrieved successfully",
    data: result,
  });
});

const getPlantById = catchAsync(async (req: Request, res: Response) => {
  const result = await PlantService.getPlantById(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Plant retrieved successfully",
    data: result,
  });
});

const updatePlant = catchAsync(async (req: Request, res: Response) => {
  const result = await PlantService.updatePlant(req.params.id as string, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Plant updated successfully",
    data: result,
  });
});

const deletePlant = catchAsync(async (req: Request, res: Response) => {
  await PlantService.deletePlant(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Plant deleted successfully",
    data: null,
  });
});

export const PlantController = {
  createPlant,
  getAllPlants,
  getPlantById,
  updatePlant,
  deletePlant,
};

import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { CareScheduleService } from "./careSchedule.service.js";

const createCareSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await CareScheduleService.createCareSchedule(req.user.id, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Care schedule created successfully",
    data: result,
  });
});

const updateCareSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await CareScheduleService.updateCareSchedule(req.params.id as string, req.user.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Care schedule updated successfully",
    data: result,
  });
});

const deleteCareSchedule = catchAsync(async (req: Request, res: Response) => {
  await CareScheduleService.deleteCareSchedule(req.params.id as string, req.user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Care schedule deleted successfully",
    data: null,
  });
});

export const CareScheduleController = {
  createCareSchedule,
  updateCareSchedule,
  deleteCareSchedule,
};

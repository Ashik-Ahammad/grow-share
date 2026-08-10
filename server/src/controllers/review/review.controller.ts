import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { ReviewService } from "./review.service.js";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.create(req.user.id, req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Review created", data: result });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAll();
  sendResponse(res, { statusCode: 200, success: true, message: "Reviews retrieved", data: result });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getById(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "Review retrieved", data: result });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.update(req.params.id as string, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Review updated", data: result });
});

const deleteRecord = catchAsync(async (req: Request, res: Response) => {
  await ReviewService.deleteRecord(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "Review deleted", data: null });
});

export const ReviewController = { create, getAll, getById, update, deleteRecord };

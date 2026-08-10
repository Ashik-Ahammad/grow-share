import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { ReportService } from "./report.service.js";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await ReportService.create(req.user.id, req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Report created", data: result });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await ReportService.getAll();
  sendResponse(res, { statusCode: 200, success: true, message: "Reports retrieved", data: result });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await ReportService.getById(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "Report retrieved", data: result });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await ReportService.update(req.params.id as string, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Report updated", data: result });
});

const deleteRecord = catchAsync(async (req: Request, res: Response) => {
  await ReportService.deleteRecord(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "Report deleted", data: null });
});

export const ReportController = { create, getAll, getById, update, deleteRecord };

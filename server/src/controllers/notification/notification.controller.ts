import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { NotificationService } from "./notification.service.js";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.create(req.user.id, req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Notification created", data: result });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.getAll();
  sendResponse(res, { statusCode: 200, success: true, message: "Notifications retrieved", data: result });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.getById(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "Notification retrieved", data: result });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.update(req.params.id as string, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Notification updated", data: result });
});

const deleteRecord = catchAsync(async (req: Request, res: Response) => {
  await NotificationService.deleteRecord(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "Notification deleted", data: null });
});

export const NotificationController = { create, getAll, getById, update, deleteRecord };

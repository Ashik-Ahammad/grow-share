import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { ExchangeRequestService } from "./exchangeRequest.service.js";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await ExchangeRequestService.create(req.user.id, req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "ExchangeRequest created", data: result });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await ExchangeRequestService.getAll();
  sendResponse(res, { statusCode: 200, success: true, message: "ExchangeRequests retrieved", data: result });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await ExchangeRequestService.getById(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "ExchangeRequest retrieved", data: result });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await ExchangeRequestService.update(req.params.id as string, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "ExchangeRequest updated", data: result });
});

const deleteRecord = catchAsync(async (req: Request, res: Response) => {
  await ExchangeRequestService.deleteRecord(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "ExchangeRequest deleted", data: null });
});

export const ExchangeRequestController = { create, getAll, getById, update, deleteRecord };

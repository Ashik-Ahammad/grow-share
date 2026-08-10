import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { TransactionService } from "./transaction.service.js";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await TransactionService.create(req.user.id, req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Transaction created", data: result });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await TransactionService.getAll();
  sendResponse(res, { statusCode: 200, success: true, message: "Transactions retrieved", data: result });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await TransactionService.getById(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "Transaction retrieved", data: result });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await TransactionService.update(req.params.id as string, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Transaction updated", data: result });
});

const deleteRecord = catchAsync(async (req: Request, res: Response) => {
  await TransactionService.deleteRecord(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "Transaction deleted", data: null });
});

export const TransactionController = { create, getAll, getById, update, deleteRecord };

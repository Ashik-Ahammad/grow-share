import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { CommentService } from "./comment.service.js";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.create(req.user.id, req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Comment created", data: result });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.getAll();
  sendResponse(res, { statusCode: 200, success: true, message: "Comments retrieved", data: result });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.getById(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "Comment retrieved", data: result });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.update(req.params.id as string, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Comment updated", data: result });
});

const deleteRecord = catchAsync(async (req: Request, res: Response) => {
  await CommentService.deleteRecord(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "Comment deleted", data: null });
});

export const CommentController = { create, getAll, getById, update, deleteRecord };

import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { PostLikeService } from "./postLike.service.js";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await PostLikeService.create(req.user.id, req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "PostLike created", data: result });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await PostLikeService.getAll();
  sendResponse(res, { statusCode: 200, success: true, message: "PostLikes retrieved", data: result });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await PostLikeService.getById(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "PostLike retrieved", data: result });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await PostLikeService.update(req.params.id as string, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "PostLike updated", data: result });
});

const deleteRecord = catchAsync(async (req: Request, res: Response) => {
  await PostLikeService.deleteRecord(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "PostLike deleted", data: null });
});

export const PostLikeController = { create, getAll, getById, update, deleteRecord };

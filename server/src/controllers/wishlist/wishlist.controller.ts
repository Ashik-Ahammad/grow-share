import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { WishlistService } from "./wishlist.service.js";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await WishlistService.create(req.user.id, req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Wishlist created", data: result });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await WishlistService.getAll();
  sendResponse(res, { statusCode: 200, success: true, message: "Wishlists retrieved", data: result });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await WishlistService.getById(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "Wishlist retrieved", data: result });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await WishlistService.update(req.params.id as string, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Wishlist updated", data: result });
});

const deleteRecord = catchAsync(async (req: Request, res: Response) => {
  await WishlistService.deleteRecord(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "Wishlist deleted", data: null });
});

export const WishlistController = { create, getAll, getById, update, deleteRecord };

import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { ListingService } from "./listing.service.js";

const createListing = catchAsync(async (req: Request, res: Response) => {
  const result = await ListingService.createListing(req.user.id, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Listing created successfully",
    data: result,
  });
});

const getAllListings = catchAsync(async (req: Request, res: Response) => {
  const result = await ListingService.getAllListings(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Listings retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getListingById = catchAsync(async (req: Request, res: Response) => {
  const result = await ListingService.getListingById(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Listing retrieved successfully",
    data: result,
  });
});

const updateListing = catchAsync(async (req: Request, res: Response) => {
  const result = await ListingService.updateListing(req.params.id as string, req.user.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Listing updated successfully",
    data: result,
  });
});

const deleteListing = catchAsync(async (req: Request, res: Response) => {
  await ListingService.deleteListing(req.params.id as string, req.user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Listing deleted successfully",
    data: null,
  });
});

export const ListingController = {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
};

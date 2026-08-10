import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { PostService } from "./post.service.js";

const createPost = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.createPost(req.user.id, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.getAllPosts(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Posts retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.getPostById(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Post retrieved successfully",
    data: result,
  });
});

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.updatePost(req.params.id as string, req.user.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Post updated successfully",
    data: result,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  await PostService.deletePost(req.params.id as string, req.user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Post deleted successfully",
    data: null,
  });
});

export const PostController = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};

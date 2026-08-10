import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const createPost = async (userId: string, payload: any) => {
  const post = await prisma.post.create({
    data: {
      ...payload,
      userId,
    },
    include: {
      user: { select: { id: true, name: true, profileImage: true } },
    }
  });
  return post;
};

const getAllPosts = async (query: any) => {
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { isDeleted: false },
      include: {
        user: { select: { id: true, name: true, profileImage: true } },
        _count: { select: { likes: true, comments: { where: { isDeleted: false } } } }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.post.count({ where: { isDeleted: false } }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: posts,
  };
};

const getPostById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id, isDeleted: false },
    include: {
      user: { select: { id: true, name: true, profileImage: true } },
      comments: {
        where: { isDeleted: false },
        include: { user: { select: { id: true, name: true, profileImage: true } } },
        orderBy: { createdAt: "desc" }
      },
      _count: { select: { likes: true } }
    },
  });

  if (!post) {
    throw new AppError(404, "Post not found");
  }

  return post;
};

const updatePost = async (id: string, userId: string, payload: any) => {
  const post = await prisma.post.findUnique({ where: { id, isDeleted: false } });
  if (!post) {
    throw new AppError(404, "Post not found");
  }
  if (post.userId !== userId) {
    throw new AppError(403, "You can only update your own post");
  }

  const updatedPost = await prisma.post.update({
    where: { id },
    data: payload,
  });

  return updatedPost;
};

const deletePost = async (id: string, userId: string) => {
  const post = await prisma.post.findUnique({ where: { id, isDeleted: false } });
  if (!post) {
    throw new AppError(404, "Post not found");
  }
  if (post.userId !== userId) {
    throw new AppError(403, "You can only delete your own post");
  }

  await prisma.post.update({
    where: { id },
    data: { isDeleted: true },
  });

  return null;
};

export const PostService = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};

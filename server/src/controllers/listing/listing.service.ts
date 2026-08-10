import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const createListing = async (userId: string, payload: any) => {
  const listing = await prisma.listing.create({
    data: {
      ...payload,
      userId,
    },
    include: {
      user: { select: { id: true, name: true, profileImage: true } },
      category: true,
    }
  });
  return listing;
};

const getAllListings = async (query: any) => {
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 20;
  const skip = (page - 1) * limit;

  const filters: any = { isDeleted: false, status: "ACTIVE" };

  if (query.categoryId) filters.categoryId = query.categoryId;
  if (query.type) filters.type = query.type;
  if (query.location) filters.location = { contains: query.location, mode: "insensitive" };
  if (query.search) filters.title = { contains: query.search, mode: "insensitive" };

  const [listings, total] = await Promise.all([
    prisma.listing.findMany({
      where: filters,
      include: {
        user: { select: { id: true, name: true, profileImage: true } },
        category: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.listing.count({ where: filters }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: listings,
  };
};

const getListingById = async (id: string) => {
  const listing = await prisma.listing.findUnique({
    where: { id, isDeleted: false },
    include: {
      user: { select: { id: true, name: true, profileImage: true } },
      category: true,
    },
  });

  if (!listing) {
    throw new AppError(404, "Listing not found");
  }

  return listing;
};

const updateListing = async (id: string, userId: string, payload: any) => {
  const listing = await prisma.listing.findUnique({ where: { id, isDeleted: false } });
  if (!listing) {
    throw new AppError(404, "Listing not found");
  }
  if (listing.userId !== userId) {
    throw new AppError(403, "You can only update your own listing");
  }

  const updatedListing = await prisma.listing.update({
    where: { id },
    data: payload,
  });

  return updatedListing;
};

const deleteListing = async (id: string, userId: string) => {
  const listing = await prisma.listing.findUnique({ where: { id, isDeleted: false } });
  if (!listing) {
    throw new AppError(404, "Listing not found");
  }
  if (listing.userId !== userId) {
    throw new AppError(403, "You can only delete your own listing");
  }

  await prisma.listing.update({
    where: { id },
    data: { isDeleted: true },
  });

  return null;
};

export const ListingService = {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
};

const fs = require('fs');

const modules = [
  { name: 'comment', model: 'comment', fields: { userId: 'userId' } },
  { name: 'postLike', model: 'postLike', fields: { userId: 'userId' } },
  { name: 'transaction', model: 'transaction', fields: { buyerId: 'userId' } },
  { name: 'exchangeRequest', model: 'exchangeRequest', fields: { requesterId: 'userId' } },
  { name: 'review', model: 'review', fields: { reviewerId: 'userId' } },
  { name: 'wishlist', model: 'wishlist', fields: { userId: 'userId' } },
  { name: 'notification', model: 'notification', fields: { userId: 'userId' } },
  { name: 'report', model: 'report', fields: { reporterId: 'userId' } },
];

modules.forEach(({ name: mod, model, fields }) => {
  const capMod = mod.charAt(0).toUpperCase() + mod.slice(1);
  const dir = 'src/controllers/' + mod;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const userIdField = Object.keys(fields)[0];

  // Service
  fs.writeFileSync(dir + '/' + mod + '.service.ts', 
`import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

const create = async (userId: string, payload: any) => {
  return await prisma.${model}.create({ data: { ...payload, ${userIdField}: userId } });
};

const getAll = async () => {
  return await prisma.${model}.findMany();
};

const getById = async (id: string) => {
  return await prisma.${model}.findUnique({ where: { id } });
};

const update = async (id: string, payload: any) => {
  return await prisma.${model}.update({ where: { id }, data: payload });
};

const deleteRecord = async (id: string) => {
  return await prisma.${model}.delete({ where: { id } });
};

export const ${capMod}Service = { create, getAll, getById, update, deleteRecord };
`);

  // Controller
  fs.writeFileSync(dir + '/' + mod + '.controller.ts',
`import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { ${capMod}Service } from "./${mod}.service.js";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await ${capMod}Service.create(req.user.id, req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "${capMod} created", data: result });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await ${capMod}Service.getAll();
  sendResponse(res, { statusCode: 200, success: true, message: "${capMod}s retrieved", data: result });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await ${capMod}Service.getById(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "${capMod} retrieved", data: result });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await ${capMod}Service.update(req.params.id as string, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "${capMod} updated", data: result });
});

const deleteRecord = catchAsync(async (req: Request, res: Response) => {
  await ${capMod}Service.deleteRecord(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "${capMod} deleted", data: null });
});

export const ${capMod}Controller = { create, getAll, getById, update, deleteRecord };
`);

  // Route
  fs.writeFileSync(dir + '/' + mod + '.route.ts',
`import { Router } from "express";
import { ${capMod}Controller } from "./${mod}.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();
router.post("/", auth(), ${capMod}Controller.create);
router.get("/", auth(), ${capMod}Controller.getAll);
router.get("/:id", auth(), ${capMod}Controller.getById);
router.patch("/:id", auth(), ${capMod}Controller.update);
router.delete("/:id", auth(), ${capMod}Controller.deleteRecord);

export const ${capMod}Routes = router;
`);
});

console.log("Boilerplate generated successfully!");

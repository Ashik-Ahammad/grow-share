import { Router } from "express";
import { CategoryController } from "./category.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.post("/", auth(), CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.patch("/:id", auth("ADMIN"), CategoryController.updateCategory);
router.delete("/:id", auth("ADMIN"), CategoryController.deleteCategory);

export const CategoryRoutes = router;

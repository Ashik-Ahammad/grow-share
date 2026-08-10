import { Router } from "express";
import { ReviewController } from "./review.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();
router.post("/", auth(), ReviewController.create);
router.get("/", auth(), ReviewController.getAll);
router.get("/:id", auth(), ReviewController.getById);
router.patch("/:id", auth(), ReviewController.update);
router.delete("/:id", auth(), ReviewController.deleteRecord);

export const ReviewRoutes = router;

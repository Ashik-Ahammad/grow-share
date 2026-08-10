import { Router } from "express";
import { CommentController } from "./comment.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();
router.post("/", auth(), CommentController.create);
router.get("/", auth(), CommentController.getAll);
router.get("/:id", auth(), CommentController.getById);
router.patch("/:id", auth(), CommentController.update);
router.delete("/:id", auth(), CommentController.deleteRecord);

export const CommentRoutes = router;

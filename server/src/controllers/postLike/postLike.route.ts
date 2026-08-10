import { Router } from "express";
import { PostLikeController } from "./postLike.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();
router.post("/", auth(), PostLikeController.create);
router.get("/", auth(), PostLikeController.getAll);
router.get("/:id", auth(), PostLikeController.getById);
router.patch("/:id", auth(), PostLikeController.update);
router.delete("/:id", auth(), PostLikeController.deleteRecord);

export const PostLikeRoutes = router;

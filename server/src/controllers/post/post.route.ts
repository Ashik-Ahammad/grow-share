import { Router } from "express";
import { PostController } from "./post.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.post("/", auth(), PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);
router.patch("/:id", auth(), PostController.updatePost);
router.delete("/:id", auth(), PostController.deletePost);

export const PostRoutes = router;

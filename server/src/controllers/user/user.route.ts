import { Router } from "express";
import { UserController } from "./user.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.get("/me", auth(), UserController.getMyProfile);
router.patch("/me", auth(), UserController.updateMyProfile);
router.get("/:id", UserController.getUserById);

export const UserRoutes = router;

import { Router } from "express";
import { NotificationController } from "./notification.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();
router.post("/", auth(), NotificationController.create);
router.get("/", auth(), NotificationController.getAll);
router.get("/:id", auth(), NotificationController.getById);
router.patch("/:id", auth(), NotificationController.update);
router.delete("/:id", auth(), NotificationController.deleteRecord);

export const NotificationRoutes = router;

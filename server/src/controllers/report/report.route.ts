import { Router } from "express";
import { ReportController } from "./report.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();
router.post("/", auth(), ReportController.create);
router.get("/", auth(), ReportController.getAll);
router.get("/:id", auth(), ReportController.getById);
router.patch("/:id", auth(), ReportController.update);
router.delete("/:id", auth(), ReportController.deleteRecord);

export const ReportRoutes = router;

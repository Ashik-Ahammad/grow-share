import { Router } from "express";
import { CareScheduleController } from "./careSchedule.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.post("/", auth(), CareScheduleController.createCareSchedule);
router.patch("/:id", auth(), CareScheduleController.updateCareSchedule);
router.delete("/:id", auth(), CareScheduleController.deleteCareSchedule);

export const CareScheduleRoutes = router;

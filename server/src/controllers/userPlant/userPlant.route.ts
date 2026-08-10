import { Router } from "express";
import { UserPlantController } from "./userPlant.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.post("/", auth(), UserPlantController.addUserPlant);
router.patch("/:id", auth(), UserPlantController.updateUserPlant);
router.delete("/:id", auth(), UserPlantController.deleteUserPlant);

export const UserPlantRoutes = router;

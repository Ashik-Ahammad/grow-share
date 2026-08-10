import { Router } from "express";
import { PlantController } from "./plant.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.post("/", auth("ADMIN"), PlantController.createPlant);
router.get("/", PlantController.getAllPlants);
router.get("/:id", PlantController.getPlantById);
router.patch("/:id", auth("ADMIN"), PlantController.updatePlant);
router.delete("/:id", auth("ADMIN"), PlantController.deletePlant);

export const PlantRoutes = router;

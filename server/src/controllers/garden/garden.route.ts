import { Router } from "express";
import { GardenController } from "./garden.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.post("/", auth(), GardenController.createGarden);
router.get("/", auth(), GardenController.getMyGardens);
router.get("/:id", auth(), GardenController.getGardenById);
router.patch("/:id", auth(), GardenController.updateGarden);
router.delete("/:id", auth(), GardenController.deleteGarden);

export const GardenRoutes = router;

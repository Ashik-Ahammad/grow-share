import { Router } from "express";
import { ListingController } from "./listing.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.post("/", auth(), ListingController.createListing);
router.get("/", ListingController.getAllListings);
router.get("/:id", ListingController.getListingById);
router.patch("/:id", auth(), ListingController.updateListing);
router.delete("/:id", auth(), ListingController.deleteListing);

export const ListingRoutes = router;

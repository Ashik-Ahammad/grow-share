import { Router } from "express";
import { WishlistController } from "./wishlist.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();
router.post("/", auth(), WishlistController.create);
router.get("/", auth(), WishlistController.getAll);
router.get("/:id", auth(), WishlistController.getById);
router.patch("/:id", auth(), WishlistController.update);
router.delete("/:id", auth(), WishlistController.deleteRecord);

export const WishlistRoutes = router;

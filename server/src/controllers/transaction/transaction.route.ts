import { Router } from "express";
import { TransactionController } from "./transaction.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();
router.post("/", auth(), TransactionController.create);
router.get("/", auth(), TransactionController.getAll);
router.get("/:id", auth(), TransactionController.getById);
router.patch("/:id", auth(), TransactionController.update);
router.delete("/:id", auth(), TransactionController.deleteRecord);

export const TransactionRoutes = router;

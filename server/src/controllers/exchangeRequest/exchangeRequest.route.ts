import { Router } from "express";
import { ExchangeRequestController } from "./exchangeRequest.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();
router.post("/", auth(), ExchangeRequestController.create);
router.get("/", auth(), ExchangeRequestController.getAll);
router.get("/:id", auth(), ExchangeRequestController.getById);
router.patch("/:id", auth(), ExchangeRequestController.update);
router.delete("/:id", auth(), ExchangeRequestController.deleteRecord);

export const ExchangeRequestRoutes = router;

import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import notFound from "./middlewares/notFound.js";
import router from "./routes/index.js";

const app: Express = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));

// default route
app.get("/", (req: Request, res: Response) => {
  res.send("GrowShare API is running 🚀");
});

app.use("/api", router);

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);

export default app;

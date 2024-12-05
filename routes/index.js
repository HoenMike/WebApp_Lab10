import { Router } from "express";
import { getAllProducts } from "../handlers/index.js";
const appRouter = Router();
appRouter.get("/", getAllProducts);
export default appRouter;

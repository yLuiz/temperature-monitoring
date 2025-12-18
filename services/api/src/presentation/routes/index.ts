import { Router } from "express";
import { pagesRoutes } from "./pages/pages.routes";
import { serverRoutes } from "./server/server.routes";

const indexRoutes = Router();

indexRoutes.use("/", pagesRoutes);
indexRoutes.use("/", serverRoutes);

export { indexRoutes };

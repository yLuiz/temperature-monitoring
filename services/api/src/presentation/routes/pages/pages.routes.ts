import { Router } from "express";
import { dashboardPageRoutes } from "./dashboard.page.routes";
import { aboutPageRoutes } from "./about.page.routes";
import { sensorManagementPageRoutes } from "./sensor-management.page.routes";

const pagesRoutes = Router();

pagesRoutes.get("/", (req, res) => {
    res.redirect("/dashboard");
});

pagesRoutes.use("/dashboard", dashboardPageRoutes);
pagesRoutes.use("/about", aboutPageRoutes);
pagesRoutes.use("/sensor-management", sensorManagementPageRoutes);

export { pagesRoutes };

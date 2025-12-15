import { Router } from "express";
import { dashboardPageRoutes } from "./dashboard.page.routes";
import { aboutPageRoutes } from "./about.page.routes";

const pagesRoutes = Router();

pagesRoutes.get("/", (req, res) => {
    res.redirect("/dashboard");
});

pagesRoutes.use("/dashboard", dashboardPageRoutes);
pagesRoutes.use("/about", aboutPageRoutes);

export { pagesRoutes };

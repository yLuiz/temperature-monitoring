import { Router } from "express";
import { DashboardPageController } from "../../controllers/pages/dashboard.page.controller";


export const dashboardPageRoutes = Router();

const controller = new DashboardPageController();

// Renderiza o HTML com Dust
dashboardPageRoutes.get("/", (req, res) => controller.render(req, res));

// Redireciona qualquer rota /dashboard/* para /dashboard
dashboardPageRoutes.get("/*path", (req, res) => {
    res.redirect("/dashboard");
});
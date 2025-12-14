import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";


export const dashboardRoutes = Router();

const controller = new DashboardController();

dashboardRoutes.get("/", (req, res) => {
    res.redirect("/dashboard");
});

// Renderiza o HTML com Dust
dashboardRoutes.get("/dashboard", (req, res) => controller.render(req, res));

// Redireciona qualquer rota /dashboard/* para /dashboard
dashboardRoutes.get("/dashboard/*path", (req, res) => {
    res.redirect("/dashboard");
});

// Endpoint “JSON” para o TinyBone fazer polling e atualizar a tela
dashboardRoutes.get("/api/sensors/latest", (req, res) => controller.latest(req, res));

// Se nenhuma rota for encontrada, redireciona para o dashboard
dashboardRoutes.get("/*path", (req, res) => {
    res.redirect("/dashboard");
});
import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";


export const dashboardRoutes = Router();

const controller = new DashboardController();

// Renderiza o HTML com Dust
dashboardRoutes.get("/dashboard", (req, res) => controller.render(req, res));

// Endpoint “JSON” para o TinyBone fazer polling e atualizar a tela
dashboardRoutes.get("/api/sensors/latest", (req, res) => controller.latest(req, res));

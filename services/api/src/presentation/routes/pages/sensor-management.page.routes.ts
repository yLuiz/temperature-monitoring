import { Router } from "express";
import { SensorManagementPageController } from "../../controllers/pages/sensor-management.page.controller";


export const sensorManagementPageRoutes = Router();

const controller = new SensorManagementPageController();

// Renderiza o HTML com Dust
sensorManagementPageRoutes.get("/", (req, res) => controller.render(req, res));

// Redireciona qualquer rota /sensor-management/* para /sensor-management
sensorManagementPageRoutes.get("/*path", (req, res) => {
    res.redirect("/sensor-management");
});
import { Router } from "express";
import { SensorReadingsServerController } from "../../controllers/server/sensor-readings.server.controller";

export const sensorReadingsRoutes = Router();
const controller = new SensorReadingsServerController();

// Endpoint “JSON” para fazer polling e atualizar a tela
sensorReadingsRoutes.get("/latest", (req, res) => controller.latest(req, res));

import { Router } from "express";
import { SensorReadingsServerController } from "../../controllers/server/sensor-readings.server.controller";

export const sensorReadingsRoutes = Router();
const controller = new SensorReadingsServerController();

sensorReadingsRoutes.get("/latest", (req, res) => controller.latest(req, res));

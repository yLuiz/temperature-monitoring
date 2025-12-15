import { Router } from "express";
import { SensorServerController } from "../../controllers/server/sensor.server.controller";

export const sensorServerRoutes = Router();

const controller = new SensorServerController();

sensorServerRoutes.get("/", (req, res) => controller.getSensorData(req, res));
import { Router } from "express";
import { SensorServerController } from "../../controllers/server/sensor.server.controller";

export const sensorServerRoutes = Router();

const controller = new SensorServerController();

sensorServerRoutes.post("/", (req, res) => controller.create(req, res));
sensorServerRoutes.get("/", (req, res) => controller.getAll(req, res));
sensorServerRoutes.get("/:id", (req, res) => controller.getById(req, res));
sensorServerRoutes.get("/code/:sensorCode", (req, res) => controller.getByCode(req, res));
sensorServerRoutes.put("/:id", (req, res) => controller.update(req, res));
sensorServerRoutes.delete("/:id", (req, res) => controller.delete(req, res));
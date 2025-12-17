import { Router } from "express";
import { sensorReadingsRoutes } from "./sensor-readings.server.routes";
import { sensorServerRoutes } from "./sensor.server.routes";

const route = Router();

route.use("/api/sensors", sensorServerRoutes);
route.use("/api/sensors-readings", sensorReadingsRoutes);

export { route as serverRoutes };


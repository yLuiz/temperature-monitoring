import { Router } from "express";
import { alertServerRoutes } from "./alert.server.routes";
import { sensorReadingsRoutes } from "./sensor-readings.server.routes";
import { sensorServerRoutes } from "./sensor.server.routes";
import { sseRoutes } from "./sse.route.server";

const route = Router();

route.use("/api/sensors", sensorServerRoutes);
route.use("/api/sensors-readings", sensorReadingsRoutes);
route.use("/api/alerts", alertServerRoutes);
route.use("/sse", sseRoutes);

export { route as serverRoutes };


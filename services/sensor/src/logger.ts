import pino from "pino";
import { envConfig } from "./config/envConfig";

export const logger = pino({
  level: envConfig().LOG_LEVEL || "info",
  base: {
    service: "sensor-service"
  }
});

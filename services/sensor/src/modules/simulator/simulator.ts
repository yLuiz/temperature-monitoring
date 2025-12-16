
import { envConfig } from "../../config/envConfig";
import { MockSensorsReading } from "../../mocks/sensors.mock";
import { ISensorReadingToSend } from "../../models/sensor-reading.model";
import { logger } from "../logger/logger";
import { publishSensorReading } from "../messaging/rabbitmq";

const INTERVAL = envConfig().SENSOR_INTERVAL_MS;

export function startSensorSimulation() {
  logger.info("Starting sensor simulation");

  setInterval(() => {
    const readings: ISensorReadingToSend[] = MockSensorsReading.generate();

    for (const reading of readings) {
      logger.info({ reading }, "Simulated sensor reading");
      publishSensorReading(reading);
    }

  }, INTERVAL);
}
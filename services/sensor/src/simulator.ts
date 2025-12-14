import { envConfig } from "./config/envConfig";
import { logger } from "./logger";
import { ISensorReading } from "./models/sensor-reading.model";
import { publishSensorReading } from "./rabbitmq";
import { MockSensorsReading } from "./sensors.mock";

const INTERVAL = envConfig().SENSOR_INTERVAL_MS;

export function startSensorSimulation() {
  logger.info("Starting sensor simulation");

  setInterval(() => {
    const readings: ISensorReading[] = MockSensorsReading.generate();

    for (const reading of readings) {
      logger.info({ reading }, "Simulated sensor reading");
      publishSensorReading(reading);
    }

  }, INTERVAL);
}

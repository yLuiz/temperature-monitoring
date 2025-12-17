
import { envConfig } from "../../config/envConfig";
import { ISensor, MockSensorsReading } from "../../mocks/sensors.mock";
import { ISensorReadingToSend } from "../../models/sensor-reading.model";
import { CacheRepositoryInstance } from "../cache/cache.repository";
import { logger } from "../logger/logger";
import { publishSensorReading } from "../messaging/use-cases/publish-sensor-reading";

const INTERVAL = envConfig().SENSOR_INTERVAL_MS;

export function startSensorSimulation() {
  logger.info("Starting sensor simulation");

  setInterval(async () => {

    const sensors = await CacheRepositoryInstance.get<ISensor[]>('sensors');

    
    if (!sensors?.length) {
      logger.warn("No sensors available for simulation");
      return;
    }

    const readings: ISensorReadingToSend[] = MockSensorsReading.generate(sensors);

    for (const reading of readings) {
      logger.info({ reading }, "Simulated sensor reading");
      await publishSensorReading(reading);
    }

  }, INTERVAL);
}
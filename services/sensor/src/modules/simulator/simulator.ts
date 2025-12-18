
import { envConfig } from "../../config/envConfig";
import { MockSensorsReadings } from "../../mocks/sensors-readings.mock";
import { ISensorReadingToSend } from "../../models/sensor-reading.model";
import { ISensor } from "../../models/sensor.model";
import { CacheRepositoryInstance } from "../cache/cache.repository";
import { logger } from "../logger/logger";
import { publishSensorReading } from "../messaging/use-cases/publish-sensor-reading";
import { populateSensors } from "./populate-sensors";

const INTERVAL = envConfig().SENSOR_INTERVAL_MS;

export function startSensorSimulation() {
  logger.info("Starting sensor simulation");
  
  populateSensors();

  setInterval(async () => {

    const sensors = await CacheRepositoryInstance.get<ISensor[]>('sensors');

    if (!sensors?.length) {
      logger.warn("No sensors available for simulation");
      return;
    }

    const readings: ISensorReadingToSend[] = MockSensorsReadings.generate(sensors);

    for (const reading of readings) {
      logger.info({ reading }, "Simulated sensor reading");
      await publishSensorReading(reading);
    }

  }, INTERVAL);
}
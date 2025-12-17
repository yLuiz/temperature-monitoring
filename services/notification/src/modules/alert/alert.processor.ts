import { ISensorReadingPayload } from "../../models/sensor-reading.payload";
import { logger } from "../logger/logger";

// Limites simples
// Em um cenário real, isso viria da API ou banco
const LIMITS = {
  temperature: {
    min: 10,
    max: 30
  },
  humidity: {
    min: 30,
    max: 70
  }
};

export async function processSensorReading(reading: ISensorReadingPayload) {
  const { sensorCode, temperature, humidity } = reading;

  if (
    temperature < LIMITS.temperature.min ||
    temperature > LIMITS.temperature.max
  ) {
    logger.warn(
      { sensorCode, temperature },
      "Temperature limit exceeded"
    );
  }

  if (
    humidity < LIMITS.humidity.min ||
    humidity > LIMITS.humidity.max
  ) {
    logger.warn(
      { sensorCode, humidity },
      "Humidity limit exceeded"
    );
  }

  logger.info(
    { sensorCode, temperature, humidity },
    "Sensor reading processed"
  );
}

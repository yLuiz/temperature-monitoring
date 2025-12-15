import { logger } from "./logger";

type SensorReading = {
  sensorId: string;
  temperature: number;
  humidity: number;
  timestamp: string;
};

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

export async function processSensorReading(reading: SensorReading) {
  const { sensorId, temperature, humidity } = reading;

  if (
    temperature < LIMITS.temperature.min ||
    temperature > LIMITS.temperature.max
  ) {
    logger.warn(
      { sensorId, temperature },
      "Temperature limit exceeded"
    );
  }

  if (
    humidity < LIMITS.humidity.min ||
    humidity > LIMITS.humidity.max
  ) {
    logger.warn(
      { sensorId, humidity },
      "Humidity limit exceeded"
    );
  }

  logger.info(
    { sensorId, temperature, humidity },
    "Sensor reading processed"
  );
}

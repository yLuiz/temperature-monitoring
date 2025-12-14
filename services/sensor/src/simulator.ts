import { logger } from "./logger";
import { publishSensorReading } from "./rabbitmq";

const INTERVAL = Number(process.env.SENSOR_INTERVAL_MS) || 3000;

function random(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

export function startSensorSimulation() {
  logger.info("Starting sensor simulation");

  setInterval(() => {
    const readings = [
      {
        sensorId: "sensor-1",
        temperature: random(15, 35),
        humidity: random(30, 80),
        timestamp: new Date().toISOString()
      },
      {
        sensorId: "sensor-2",
        temperature: random(15, 35),
        humidity: random(30, 80),
        timestamp: new Date().toISOString()
      },
      {
        sensorId: "sensor-3",
        temperature: random(15, 35),
        humidity: random(30, 80),
        timestamp: new Date().toISOString()
      }
    ];

    for (const reading of readings) {
      logger.info({ reading }, "Simulated sensor reading");
      publishSensorReading(reading);
    }
    
  }, INTERVAL);
}

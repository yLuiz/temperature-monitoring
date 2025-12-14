import app from "./app";
import { DatabaseInstance } from "./infrastructure/database/in-memory/database.instance";
import { logger } from "./infrastructure/logger/logger";
import { startSensorReadingConsumer } from "./infrastructure/messaging/rabbitmq.consumer";



(async function bootstrap() {
  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;

    await startSensorReadingConsumer(async (reading) => {
      logger.info({ reading }, "Received sensor reading in API");

      DatabaseInstance.db.readings.save({
        sensorId: reading.sensorId,
        sensor: DatabaseInstance.db.sensors.getById(reading.sensorId)!,
        temperature: reading.temperature,
        humidity: reading.humidity,
        updatedAt: reading.timestamp
      });
    });

    app.listen(port, () => {
      console.log(`✅ API running on http://localhost:${port}/dashboard`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

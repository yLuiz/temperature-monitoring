import app from "./app";
import { AppDataSource } from "./infrastructure/database/postgres/data-source";
import { DatabaseInstance } from "./infrastructure/database/in-memory/database.instance";
import { logger } from "./infrastructure/logger/logger";
import { startSensorReadingConsumer } from "./infrastructure/messaging/rabbitmq.consumer";
import "reflect-metadata";


(async function bootstrap() {
  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;

    await AppDataSource.initialize();
    logger.info("Database connected");

    /* 
    ** Inicia o consumidor RabbitMQ para leituras de sensores. 
    ** (Depois organizar em arquivo separado, deixando mais limpo o index.ts)
    */
    await startSensorReadingConsumer(async (reading) => {
      logger.info({ reading }, "Received sensor reading in API");

      const sensor = DatabaseInstance.db.sensors.getByCode(reading.sensorCode);
      if (!sensor) {
        logger.warn(
          { sensorCode: reading.sensorCode },
          "Sensor not found for incoming reading"
        );
        return;
      }

      DatabaseInstance.db.readings.save({
        sensorId: sensor.id,
        sensor: sensor,
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

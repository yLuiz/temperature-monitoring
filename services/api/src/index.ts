import app from "./app";
import { envConfig } from "./config/envConfig";
import { initDatabase } from "./infrastructure/database/init-database";
import { SensorRepositoryInstance } from "./infrastructure/database/postgres/repositories/sensor.repository";
import { logger } from "./infrastructure/logger/logger";
import { connectRabbitMQ, publishSensorListUpdated } from "./infrastructure/messaging/rabbitmq";
import { runRabbitMQConsumers } from "./infrastructure/messaging/run-rabbitmq-consumers";


(async function bootstrap() {
  try {
    const port = envConfig().PORT;
    await initDatabase();
    await connectRabbitMQ();
    await runRabbitMQConsumers();

    app.listen(port, () => {
      logger.info(`[SUCCESS] >>> API running on http://localhost:${port}/dashboard <<<`);
    });

    /* 
    Teste de envio de sensors readings via RabbitMQ
    */
    const sensorsToSend = await SensorRepositoryInstance.getAll();
    await publishSensorListUpdated(sensorsToSend);


  } catch (error) {
    logger.error(error, "[FATAL] >>> Failed to start API <<<");
    process.exit(1);
  }
})();

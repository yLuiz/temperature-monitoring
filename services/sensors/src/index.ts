import { logger } from "./logger";
import { connectRabbitMQ } from "./rabbitmq";
import { startSensorSimulation } from "./simulator";

(async function bootstrap() {
  try {
    logger.info("Starting Sensor Service");

    await connectRabbitMQ();
    startSensorSimulation();
  } catch (error) {
    logger.fatal({ error }, "Failed to start Sensor Service");
    process.exit(1);
  }
})();

import { logger } from "./logger";
import { connectRabbitMQ } from "./rabbitmq";
import { startSensorSimulation } from "./simulator";

(async function bootstrap() {
  try {

    logger.info("Loading... [ Initializing Sensor Service... ]");

    await connectRabbitMQ();
    logger.info(">>> Sensor Service started successfully :D <<<");

    startSensorSimulation();
  } catch (error) {
    logger.fatal(error, ">>> Failed to start Sensor Service :( <<<");
    process.exit(1);
  }
})();

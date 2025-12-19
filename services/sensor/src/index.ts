import { logger } from "./modules/logger/logger";
import { initRabbitMQ } from "./modules/messaging/init-rabbitmq";
import { startSensorSimulation } from "./modules/simulator/simulator";
(async function bootstrap() {
  try {

    logger.info("Loading... [ Initializing Sensor Service... ]");

    await initRabbitMQ();
    logger.info(">>> Sensor Service started successfully :D <<<");

    startSensorSimulation();
  } catch (error) {
    logger.fatal(error, ">>> Failed to start Sensor Service :( <<<");
    process.exit(1);
  }
})();

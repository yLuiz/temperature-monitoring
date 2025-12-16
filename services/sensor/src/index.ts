import { ISensor, MockSensorsReading } from "./mocks/sensors.mock";
import { logger } from "./modules/logger/logger";
import { consumeSensorListUpdated } from "./modules/messaging/consume-sensor-list-updated";
import { askForSensorListUpdate, connectRabbitMQ, consumeSensors } from "./modules/messaging/rabbitmq";
import { startSensorSimulation } from "./modules/simulator/simulator";
(async function bootstrap() {
  try {

    logger.info("Loading... [ Initializing Sensor Service... ]");

    await connectRabbitMQ();
    logger.info(">>> Sensor Service started successfully :D <<<");

    askForSensorListUpdate();
    startSensorSimulation();
    consumeSensorListUpdated();
  } catch (error) {
    logger.fatal(error, ">>> Failed to start Sensor Service :( <<<");
    process.exit(1);
  }
})();

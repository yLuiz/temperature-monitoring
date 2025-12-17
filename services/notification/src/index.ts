
import { processSensorReading } from "./modules/alert/alert.processor";
import { logger } from "./modules/logger/logger";
import { initRabbitMQ } from "./modules/messaging/init-rabbitmq";
import { connectRabbitMQ } from "./modules/messaging/rabbitmq";
import { consumeSensorReadings } from "./modules/messaging/use-cases/consume-sensor-readings";

(async function bootstrap() {
    try {
        logger.info("Loading... [ Initializing Notification Service... ]");
        await connectRabbitMQ();
        await initRabbitMQ();

        consumeSensorReadings(processSensorReading);

        logger.info(">>> Notification Service started successfully :D <<<");
    } catch (error) {
        logger.fatal(error, ">>> Failed to start Notification Service :( <<<");
        process.exit(1);
    }
})();

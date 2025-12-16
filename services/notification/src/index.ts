
import { processSensorReading } from "./modules/alert/alert.processor";
import { logger } from "./modules/logger/logger";
import { connectRabbitMQ } from "./modules/messaging/rabbitmq";

(async function bootstrap() {
    try {
        logger.info("Loading... [ Initializing Notification Service... ]");
        await connectRabbitMQ(processSensorReading);

        logger.info(">>> Notification Service started successfully :D <<<");
    } catch (error) {
        logger.fatal(error, ">>> Failed to start Notification Service :( <<<");
        process.exit(1);
    }
})();

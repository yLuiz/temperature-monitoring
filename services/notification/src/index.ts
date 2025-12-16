import { processSensorReading } from "./alert.processor";
import { logger } from "./logger";
import { connectRabbitMQ } from "./rabbitmq";

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

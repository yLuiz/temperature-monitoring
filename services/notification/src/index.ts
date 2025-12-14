import { processSensorReading } from "./alert.processor";
import { logger } from "./logger";
import { connectRabbitMQ } from "./rabbitmq";

(async function bootstrap() {
    try {
        logger.info("Starting Notification Service");

        await connectRabbitMQ(processSensorReading);
    } catch (error) {
        logger.fatal({ error }, "Failed to start Notification Service");
        process.exit(1);
    }
})();

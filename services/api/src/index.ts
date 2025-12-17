import app from "./app";
import { envConfig } from "./config/envConfig";
import { initDatabase } from "./infrastructure/database/init-database";
import { logger } from "./infrastructure/logger/logger";
import { initRabbitMQ } from "./infrastructure/messaging/init-rabbitmq";


(async function bootstrap() {
  try {
    const port = envConfig().PORT;
    await initDatabase();
    await initRabbitMQ();

    app.listen(port, () => {
      logger.info(`[SUCCESS] >>> API running on http://localhost:${port}/dashboard <<<`);
    });
  } catch (error) {
    logger.error(error, "[FATAL] >>> Failed to start API <<<");
    process.exit(1);
  }
})();

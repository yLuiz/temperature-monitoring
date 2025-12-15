import app from "./app";
import { initDatabase } from "./infrastructure/database/init-database";
import { logger } from "./infrastructure/logger/logger";
import { runRabbitMQConsumers } from "./infrastructure/messaging/run-rabbitmq-consumers";


(async function bootstrap() {
  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;

    await initDatabase();
    await runRabbitMQConsumers();
    
    app.listen(port, () => {
      logger.info(`[SUCCESS] >>> API running on http://localhost:${port}/dashboard <<<`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

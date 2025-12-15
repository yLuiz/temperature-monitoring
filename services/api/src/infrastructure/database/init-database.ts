import { logger } from "../logger/logger";
import { AppDataSource } from "./postgres/data-source";

export async function initDatabase() {
    try {
        await AppDataSource.initialize();
        logger.info("Database connected");
    }
    catch (error) {
        logger.error({ error }, "Error during Data Source initialization:");
        throw error;
    }
}
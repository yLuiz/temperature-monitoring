import { logger } from "../../../logger/logger";
import { AppDataSource } from "../data-source";
import { PopulateSensor1765742040816 } from "./1765742040816-populate_sensor";

import * as dotenv from "dotenv";
dotenv.config({ override: false });

/* 
    This script runs the database seeders to populate initial data into the PostgreSQL database.
    It necessary because typeorm-extension does not work like expected in kubernetes environment.
*/
async function run() {

    if (process.env.IS_RUNNING_IN_DOCKER === "false") {
        logger.error("[FATAL] >>> This script should not be run in development mode <<<");
        return;
    }

    await AppDataSource.initialize();

    const populateSensor = new PopulateSensor1765742040816();
    await populateSensor.run(AppDataSource, {} as any);

    await AppDataSource.destroy();
    process.exit(0);
}

run().catch((err) => {
    logger.error(err, "[FATAL] >>> Failed to run seeds <<<");
    process.exit(1);
});

import { logger } from "../../../logger/logger";
import { AppDataSource } from "../data-source";
import { PopulateSensor1765742040816 } from "./1765742040816-populate_sensor";

/* 
    This script runs the database seeders to populate initial data into the PostgreSQL database.
    It necessary because typeorm-extension does not work like expected in kubernetes environment.
*/
// async function run() {
//     await AppDataSource.initialize();

//     const populateSensor = new PopulateSensor1765742040816();
//     await populateSensor.run(AppDataSource, {} as any);

//     await AppDataSource.destroy();
//     process.exit(0);
// }

// run().catch((err) => {
//     logger.error(err, "[FATAL] >>> Failed to run seeds <<<");
//     process.exit(1);
// });

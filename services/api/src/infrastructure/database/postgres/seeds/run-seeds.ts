import { AppDataSource } from "../data-source";
import { PopulateSensor1765742040816 } from "./1765742040816-populate_sensor";


async function run() {
    await AppDataSource.initialize();

    const populateSensor = new PopulateSensor1765742040816();
    await populateSensor.run(AppDataSource, {} as any);

    await AppDataSource.destroy();
    process.exit(0);
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});

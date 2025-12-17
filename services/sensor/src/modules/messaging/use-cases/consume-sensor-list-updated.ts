import { ISensor } from "../../../mocks/sensors.mock";
import { CacheRepositoryInstance } from "../../cache/cache.repository";
import { logger } from "../../logger/logger";
import { onConsumeSensorsListUpdated } from "./on-consume-sensors";


export async function consumeSensorListUpdated() {
    try {
        logger.info("Consuming sensor list updated messages");
        onConsumeSensorsListUpdated(async (message: { sensors: ISensor[] }) => {
            await CacheRepositoryInstance.set("sensors", message.sensors);
        });

    }
    catch (error) {
        logger.error(error, "Failed to consume sensor list updated messages");
        throw error;
    }
}
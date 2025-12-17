import { SensorRepositoryInstance } from "../../database/postgres/repositories/sensor.repository";
import { logger } from "../../logger/logger";
import { publishSensorListUpdated } from "../publishers/publishSensorListUpdated";

export async function onConsumeSensorListRequest(payload: unknown): Promise<void> {

    const sensorsToSend = await SensorRepositoryInstance.getAll();
    await publishSensorListUpdated(sensorsToSend);

    logger.info("Processed sensor list request and published updated sensor list");

}
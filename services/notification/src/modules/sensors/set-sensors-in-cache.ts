import { SensorInterface } from "../../models/sensor.interface";
import { CacheRepositoryInstance } from "../cache/cache.repository";
import { logger } from "../logger/logger";

export async function setSensorsInCache(sensors: SensorInterface[]): Promise<void> {
    const _cacheRepository = CacheRepositoryInstance;
    await _cacheRepository.set<SensorInterface[]>("sensors", sensors);

    logger.info(
        { sensorCount: sensors.length },
        "Sensors cached successfully"
    );
}
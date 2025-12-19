import { SensorInterface } from "../../models/sensor.interface";
import { CacheRepositoryInstance } from "../cache/cache.repository";

interface SensorCacheReponse {
    sensors: SensorInterface[];
}

export async function getSensorsInCache(): Promise<SensorCacheReponse | null> {
    const _cacheRepository = CacheRepositoryInstance;

    const sensors = await _cacheRepository.get<SensorCacheReponse>("sensors");
    return sensors;
}
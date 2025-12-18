import { SensorsData } from "../../mocks/sensors-data";
import { ISensor } from "../../models/sensor.model";
import { CacheRepositoryInstance } from "../cache/cache.repository";

export function populateSensors() {
    CacheRepositoryInstance.set<ISensor[]>('sensors', SensorsData);
}
import { getSensorsInCache } from "./get-sensors-in-cache";

export async function getSensorByCodeInCache(code: string) {
    const sensorsData = await getSensorsInCache();
    if (!sensorsData) {
        return null;
    }
    return sensorsData.sensors.find(sensor => sensor.sensor_code === code) || null;
}
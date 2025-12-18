import { processSensorReading } from "../../alert/alert.processor";
import { setSensorsInCache } from "../../sensors/set-sensors-in-cache";
import { consumeSensorReadings } from "./consume-sensor-readings";
import { consumeSensorsListUpdated } from "./consume-sensors-list-updated";

export async function runConsumers() {
    consumeSensorReadings(processSensorReading);
    consumeSensorsListUpdated(setSensorsInCache);
}
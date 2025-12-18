import { onConsumeSensorListRequest } from "../use-cases/on-consume-sensor-list-request";
import { onConsumeSensorReadings } from "../use-cases/on-consume-sensor-readings";
import { consumeSensorListRequest } from "./consume-sensor-list-request";
import { consumeSensorReadings } from "./consume-sensor-readings";

export async function runRabbitMQConsumers() {
    await consumeSensorReadings(payload => onConsumeSensorReadings(payload));
    await consumeSensorListRequest(payload => onConsumeSensorListRequest(payload));
}
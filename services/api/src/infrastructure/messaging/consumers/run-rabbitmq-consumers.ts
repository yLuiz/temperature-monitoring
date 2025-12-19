import { onConsumeNotificationAlert } from "../use-cases/on-consume-notification-alert";
import { onConsumeSensorListRequest } from "../use-cases/on-consume-sensor-list-request";
import { onConsumeSensorReadings } from "../use-cases/on-consume-sensor-readings";
import { consumeNotificationAlert } from "./consume-notification-alert";
import { consumeSensorListRequest } from "./consume-sensor-list-request";
import { consumeSensorReadings } from "./consume-sensor-readings";

export function runRabbitMQConsumers() {
    consumeSensorReadings(payload => onConsumeSensorReadings(payload));
    consumeSensorListRequest(payload => onConsumeSensorListRequest(payload));
    consumeNotificationAlert(payload => onConsumeNotificationAlert(payload));
}
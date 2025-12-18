import { SensorAlertInterface } from "../../../application/interfaces/notification/sensor-alert.interface";

export async function onConsumeNotificationAlert(payload: SensorAlertInterface): Promise<void> {
    console.log("Alerta de notificação consumido");
    console.log(payload);
}
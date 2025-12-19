import { SensorAlertInterface } from "../../../application/interfaces/alert/sensor-alert.interface";
import { RegisterAlertUseCase } from "../../../application/use-cases/alerts/register-alert.use-case";

const registerSensorAlert = new RegisterAlertUseCase();

export async function onConsumeNotificationAlert(payload: SensorAlertInterface): Promise<void> {
    return await registerSensorAlert.execute(payload);
}
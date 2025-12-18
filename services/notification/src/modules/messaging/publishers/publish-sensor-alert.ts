import { SensorAlertPayload } from "../../alert/alert.processor";
import { getChannel } from "../rabbitmq";
import { EXCHANGES, ROUTING_KEYS } from "../rabbitmq.constants";

export async function publishSensorAlert(payload: SensorAlertPayload) {
    const channel = await getChannel();

    channel.publish(
        EXCHANGES.NOTIFICATION_SENSOR_ALERTS,
        ROUTING_KEYS.NOTIFICATION_SENSOR_ALERT,
        Buffer.from(JSON.stringify(payload)),
        { persistent: true }
    )
}
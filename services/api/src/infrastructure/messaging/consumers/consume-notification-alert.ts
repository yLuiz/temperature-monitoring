import { SensorAlertInterface } from "../../../application/interfaces/alert/sensor-alert.interface";
import { getChannel } from "../rabbitmq";
import { QUEUES } from "../rabbitmq.constants";

export async function consumeNotificationAlert(onMessage: (payload: SensorAlertInterface) => Promise<void>) {
    const channel = await getChannel();

    channel.consume(
        QUEUES.NOTIFICATION_SENSOR_ALERT,
        async (msg) => {
            if (msg) {
                const payload = JSON.parse(msg.content.toString());
                await onMessage(payload);
                channel.ack(msg);
            }
        },
        { noAck: false }
    )
}
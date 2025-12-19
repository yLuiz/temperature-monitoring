import { ConsumeMessage } from "amqplib";
import { QUEUES } from "../rabbitmq.constants";
import { getChannel } from "../rabbitmq";
import { logger } from "../../logger/logger";
import { SensorInterface } from "../../../models/sensor.interface";

export async function consumeSensorsListUpdated(onMessage: (payload: SensorInterface[]) => Promise<void>) {
    const channel = await getChannel();

    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    await channel.consume(
        QUEUES.NOTIFICATION_SENSOR_LIST_UPDATED,
        async (msg: ConsumeMessage | null) => {
            if (!msg) return;

            try {
                const payload = JSON.parse(msg.content.toString());
                await onMessage(payload);

                channel.ack(msg);
            } catch (error) {
                logger.error(error, "Failed to process message");
                channel.nack(msg, false, false); // descarta mensagem
            }
        }
    );
}
import { ConsumeMessage } from "amqplib";
import { getChannel } from "../rabbitmq";
import { QUEUES } from "../rabbitmq.constants";
import { logger } from "../../logger/logger";
import { ISensorReadingPayload } from "../../../models/sensor-reading.payload";

export async function consumeSensorReadings(onMessage: (payload: ISensorReadingPayload) => Promise<void>) {

    const channel = await getChannel();

    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    await channel.consume(
        QUEUES.NOTIFICATION,
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
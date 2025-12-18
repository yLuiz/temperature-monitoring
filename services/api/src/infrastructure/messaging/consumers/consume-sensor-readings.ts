import { ConsumeMessage } from "amqplib";
import { logger } from "../../logger/logger";
import { getChannel, SensorReadingMessage } from "../rabbitmq";
import { QUEUES } from "../rabbitmq.constants";

export async function consumeSensorReadings(
    onMessage: (reading: SensorReadingMessage) => Promise<void>
): Promise<void> {

    const channel = await getChannel();

    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    await channel.consume(
        QUEUES.API_READINGS,
        async (msg: ConsumeMessage | null) => {
            if (!msg) return;

            try {
                const payload = JSON.parse(
                    msg.content.toString()
                ) as SensorReadingMessage;

                await onMessage(payload);
                channel.ack(msg);
            } catch (error) {
                logger.error(
                    error,
                    "Failed to process sensor reading"
                );
                channel.nack(msg, false, false);
            }
        }
    );
}
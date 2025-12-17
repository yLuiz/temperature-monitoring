import { ConsumeMessage } from "amqplib";
import { getChannel } from "../rabbitmq";
import { EXCHANGES, QUEUES, ROUTING_KEYS } from "../rabbitmq.constants";
import { logger } from "../../logger/logger";

export async function consumeSensorListRequest(
    onMessage: (payload: any) => Promise<void>
): Promise<void> {

    const channel = await getChannel();

    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    channel.consume(
        QUEUES.SENSOR_LIST,
        async (msg: ConsumeMessage | null) => {
            if (!msg) return;
            try {
                const content = JSON.parse(msg.content.toString());
                logger.info(
                    {
                        exchange: EXCHANGES.SENSORS,
                        routingKey: ROUTING_KEYS.SENSOR_LIST_REQUEST,
                    },
                    "Sensor list request consumed"
                );

                await onMessage(content);
                channel.ack(msg);
            } catch (error) {
                logger.error(error, "Failed to process sensor list request");
                channel.nack(msg, false, false); // DLQ futuramente
            }
        }
    );
}
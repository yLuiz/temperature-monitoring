import { ConsumeMessage } from "amqplib";
import { logger } from "../../logger/logger";
import { getChannel } from "../rabbitmq";
import { EXCHANGES, QUEUES, ROUTING_KEYS } from "../rabbitmq.constants";


export async function onConsumeSensorsListUpdated(
    onMessage: (payload: any) => Promise<void>
): Promise<void> {
    
    const channel = await getChannel();

    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    channel.consume(
        QUEUES.SENSOR_SERVICE_SENSOR_LIST_UPDATED,
        async (msg: ConsumeMessage | null) => {
            if (!msg) return;
            try {
                const content = JSON.parse(msg.content.toString());

                logger.info(
                    {
                        exchange: EXCHANGES.SENSORS,
                        routingKey: ROUTING_KEYS.SENSOR_LIST_UPDATED,
                    },
                    "Sensor list consumed"
                );

                await onMessage(content);
                channel.ack(msg);
            } catch (error) {
                logger.error(error, "Failed to process sensor list");
                channel.nack(msg, false, false); // DLQ futuramente
            }
        }
    );
}

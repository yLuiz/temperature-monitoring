import amqp, { Channel, ConsumeMessage } from "amqplib";
import { logger } from "./logger";


let channel: Channel;

const QUEUE_NAME = "sensor-readings";

export async function connectRabbitMQ(
    onMessage: (payload: any) => Promise<void>
): Promise<void> {
    const url = process.env.RABBITMQ_URL;

    if (!url) {
        throw new Error("RABBITMQ_URL not defined");
    }

    const connection = await amqp.connect(url);
    channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: false });

    await channel.consume(QUEUE_NAME, async (msg: ConsumeMessage | null) => {
        if (!msg) return;

        try {
            const payload = JSON.parse(msg.content.toString());
            await onMessage(payload);

            channel.ack(msg);
        } catch (error) {
            logger.error({ error }, "Failed to process message");
            channel.nack(msg, false, false); // descarta mensagem
        }
    });

    logger.info("Connected to RabbitMQ and waiting for messages");
}

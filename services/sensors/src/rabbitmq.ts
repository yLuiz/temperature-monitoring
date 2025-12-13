import amqp, { Channel } from "amqplib";
import { logger } from "./logger";

let channel: Channel;

const QUEUE_NAME = "sensor-readings";

export async function connectRabbitMQ(): Promise<void> {
  try {
    const url = process.env.RABBITMQ_URL;

    if (!url) {
      throw new Error("RABBITMQ_URL not defined");
    }

    const connection = await amqp.connect(url);
    channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: false });

    logger.info("Connected to RabbitMQ");
  }
  catch (error) {
    logger.fatal({ error }, "Failed to connect to RabbitMQ");
    throw error;
  }
}

export function publishSensorReading(message: object) {
  try {
    if (!channel) {
      throw new Error("RabbitMQ channel not initialized");
    }

    const payload = Buffer.from(JSON.stringify(message));
    channel.sendToQueue(QUEUE_NAME, payload);

    logger.info({ message }, "Sensor reading published");
  }
  catch (error) {
    logger.error({ error }, "Failed to publish sensor reading");
    throw error;
  }
}

import amqp, { Channel } from "amqplib";
import { logger } from "./logger";
import {
  EXCHANGES,
  ROUTING_KEYS
} from "./rabbitmq.constants";

import * as dotenv from "dotenv";
dotenv.config();

let channel: Channel;

export async function connectRabbitMQ(): Promise<void> {
  try {
    const url = process.env.RABBITMQ_URL;

    if (!url) {
      throw new Error("RABBITMQ_URL not defined");
    }

    const connection = await amqp.connect(url);
    channel = await connection.createChannel();

    // ✅ Exchange do tipo topic
    await channel.assertExchange(
      EXCHANGES.SENSOR_READINGS,
      "topic",
      { durable: true }
    );

    logger.info(
      { exchange: EXCHANGES.SENSOR_READINGS },
      "Connected to RabbitMQ (topic exchange)"
    );
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

    channel.publish(
      EXCHANGES.SENSOR_READINGS,
      ROUTING_KEYS.SENSOR_READING_CREATED,
      payload,
      { persistent: true }
    );

    logger.info(
      {
        exchange: EXCHANGES.SENSOR_READINGS,
        routingKey: ROUTING_KEYS.SENSOR_READING_CREATED,
        message
      },
      "Sensor reading published"
    );
  }
  catch (error) {
    logger.error({ error }, "Failed to publish sensor reading");
    throw error;
  }
}

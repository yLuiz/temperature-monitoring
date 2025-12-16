import amqp, { Channel, ConsumeMessage } from "amqplib";
import { logger } from "../logger/logger";
import {
  EXCHANGES,
  QUEUES,
  ROUTING_KEYS,
} from "./rabbitmq.constants";

import * as dotenv from "dotenv";
import { envConfig } from "../../config/envConfig";
dotenv.config({ override: false });

export type SensorReadingMessage = {
  sensorCode: string;
  temperature: number;
  humidity: number;
  timestamp: string;
};

let channel: Channel;

export async function startSensorReadingConsumer(
  onMessage: (reading: SensorReadingMessage) => Promise<void>
): Promise<void> {
  const url = envConfig().RABBITMQ_URL;

  if (!url) {
    throw new Error("RABBITMQ_URL not defined");
  }

  const connection = await amqp.connect(url);
  channel = await connection.createChannel();

  // Exchange
  await channel.assertExchange(
    EXCHANGES.SENSOR_READINGS,
    "topic",
    { durable: true }
  );

  // Fila da API
  await channel.assertQueue(
    QUEUES.API_READINGS,
    { durable: false }
  );

  // Bind
  await channel.bindQueue(
    QUEUES.API_READINGS,
    EXCHANGES.SENSOR_READINGS,
    ROUTING_KEYS.SENSOR_READING_CREATED
  );

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

  logger.info(
    {
      exchange: EXCHANGES.SENSOR_READINGS,
      queue: QUEUES.API_READINGS,
    },
    "API connected to RabbitMQ and consuming sensor readings"
  );
}

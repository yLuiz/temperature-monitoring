import amqp, { Channel } from "amqplib";
import { envConfig } from "../../config/envConfig";
import { logger } from "../logger/logger";
import {
  EXCHANGES,
  QUEUES,
  ROUTING_KEYS
} from "./rabbitmq.constants";

let channel: Channel;

export async function getChannel(): Promise<Channel> {
  if (!channel) {
    await connectRabbitMQ();
  }

  return channel;
}

let tries = 0;
const maxRetries = 5;
const retryDelayMs = 5000;

export async function connectRabbitMQ(): Promise<void> {
  const url = envConfig().RABBITMQ_URL;

  if (!url) {
    throw new Error("RABBITMQ_URL not defined");
  }

  try {
    const connection = await amqp.connect(url);
    channel = await connection.createChannel();

    logger.info("Connected to RabbitMQ (topic exchange) and waiting for messages");
  }
  catch (error) {
    logger.fatal(error, "Failed to connect to RabbitMQ");
    if (tries < maxRetries) {
      tries++;
      logger.info(`Retrying to connect to RabbitMQ (${tries}/${maxRetries}) in ${retryDelayMs / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      return connectRabbitMQ();
    }
  }
}

export async function setupRabbitMQChannel() {
  channel.prefetch(10);

  // Exchange do tipo topic
  await channel.assertExchange(
    EXCHANGES.SENSOR_READINGS,
    "topic",
    { durable: true }
  );

  await channel.assertExchange(
    EXCHANGES.SENSORS,
    "topic",
    { durable: true }
  );

  // Fila específica do Notification Service
  await channel.assertQueue(
    QUEUES.NOTIFICATION,
    { durable: false }
  );

  // Bind da fila à exchange
  await channel.bindQueue(
    QUEUES.NOTIFICATION,
    EXCHANGES.SENSOR_READINGS,
    ROUTING_KEYS.SENSOR_READING_CREATED
  );


}

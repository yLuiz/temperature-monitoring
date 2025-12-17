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

  try {
    const url = envConfig().RABBITMQ_URL;
    if (!url) throw new Error("RABBITMQ_URL not defined");

    const connection = await amqp.connect(url);
    channel = await connection.createChannel();

    logger.info("Sensor service connected to RabbitMQ");
  } catch (error) {
    logger.fatal(error, "Failed to connect to RabbitMQ");

    if (tries < maxRetries) {
      tries++;
      logger.info(`Retrying to connect to RabbitMQ (${tries}/${maxRetries}) in ${retryDelayMs / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      return connectRabbitMQ();
    }
    throw error;
  }
}

export async function setupRabbitMQChannel() {
  // Exchange onde a API publica lista de sensores
  await channel.assertExchange(EXCHANGES.SENSORS, "topic", { durable: true });

  // Exchange onde este serviço publica leituras
  await channel.assertExchange(EXCHANGES.SENSOR_READINGS, "topic", { durable: true });

  // Fila DESTE serviço
  await channel.assertQueue(QUEUES.SENSOR_LIST, { durable: true });

  // Bind APENAS para sensor.list.updated
  await channel.bindQueue(
    QUEUES.SENSOR_LIST,
    EXCHANGES.SENSORS,
    ROUTING_KEYS.SENSOR_LIST_UPDATED
  );

  channel.prefetch(5);
}
import amqp, { Channel, ConsumeMessage } from "amqplib";
import { logger } from "../logger/logger";
import {
  EXCHANGES,
  QUEUES,
  ROUTING_KEYS,
} from "./rabbitmq.constants";

import * as dotenv from "dotenv";
import { envConfig } from "../../config/envConfig";
import { Sensor } from "../database/postgres/entities/Sensor";
dotenv.config({ override: false });

export type SensorReadingMessage = {
  sensorCode: string;
  temperature: number;
  humidity: number;
  timestamp: string;
};

export type SensorListUpdatedMessage = {
  sensors: Sensor[];
  timestamp: string;
};

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


    logger.info("Connected to RabbitMQ");
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
  await channel.assertExchange(EXCHANGES.SENSORS, "topic", { durable: true });
  await channel.assertExchange(EXCHANGES.SENSOR_READINGS, "topic", { durable: true });
  await channel.assertExchange(EXCHANGES.NOTIFICATION_SENSOR_ALERTS, "fanout", { durable: true });

  // Consumer declara fila
  await channel.assertQueue(QUEUES.API_READINGS, { durable: true });

  await channel.bindQueue(
    QUEUES.API_READINGS,
    EXCHANGES.SENSOR_READINGS,
    ROUTING_KEYS.SENSOR_READING_CREATED
  );

  channel.prefetch(10);

  // Consumer para solicitações de lista de sensores
  await channel.assertQueue(QUEUES.SENSOR_LIST_REQUEST, { durable: true });

  await channel.bindQueue(
    QUEUES.SENSOR_LIST_REQUEST,
    EXCHANGES.SENSORS,
    ROUTING_KEYS.SENSOR_LIST_REQUEST,
  );

  await channel.assertQueue(
    QUEUES.NOTIFICATION_SENSOR_ALERT,
    { durable: true }
  );

  // Bind da fila à exchange de alertas
  await channel.bindQueue(
    QUEUES.NOTIFICATION_SENSOR_ALERT,
    EXCHANGES.NOTIFICATION_SENSOR_ALERTS,
    ROUTING_KEYS.NOTIFICATION_SENSOR_ALERT
  );

}
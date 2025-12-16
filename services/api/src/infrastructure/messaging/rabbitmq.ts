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

export async function connectRabbitMQ(): Promise<void> {
  try {
    const url = envConfig().RABBITMQ_URL;
    if (!url) throw new Error("RABBITMQ_URL not defined");

    const connection = await amqp.connect(url);
    channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGES.SENSORS, "topic", { durable: true });
    await channel.assertExchange(EXCHANGES.SENSOR_READINGS, "topic", { durable: true });

    // Consumer declara fila
    await channel.assertQueue(QUEUES.API_READINGS, { durable: true });

    await channel.bindQueue(
      QUEUES.API_READINGS,
      EXCHANGES.SENSOR_READINGS,
      ROUTING_KEYS.SENSOR_READING_CREATED
    );

    channel.prefetch(10);

    logger.info("Connected to RabbitMQ");
  } catch (error) {
    logger.fatal(error, "Failed to connect to RabbitMQ");
    throw error;
  }
}

export async function startSensorReadingConsumer(
  onMessage: (reading: SensorReadingMessage) => Promise<void>
): Promise<void> {

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

  logger.info(
    {
      exchange: EXCHANGES.SENSOR_READINGS,
      queue: QUEUES.API_READINGS,
    },
    "API connected to RabbitMQ and consuming sensor readings"
  );
}

export async function publishSensorListUpdated(
  sensors: Sensor[]
): Promise<void> {
  if (!channel) throw new Error("RabbitMQ channel not initialized");

  const payload: SensorListUpdatedMessage = {
    sensors,
    timestamp: new Date().toISOString(),
  };

  channel.publish(
    EXCHANGES.SENSORS,
    ROUTING_KEYS.SENSOR_LIST_UPDATED,
    Buffer.from(JSON.stringify(payload)),
    {
      persistent: true,
      contentType: "application/json",
    }
  );

  logger.info(
    { count: payload.sensors.length },
    "Sensor list updated published"
  );
}

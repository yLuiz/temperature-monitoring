import amqp, { Channel, ConsumeMessage } from "amqplib";

import { envConfig } from "../../config/envConfig";
import { logger } from "../logger/logger";
import {
  EXCHANGES,
  QUEUES,
  ROUTING_KEYS
} from "./rabbitmq.constants";


let channel: Channel;


export async function connectRabbitMQ(): Promise<void> {
  try {
    const url = envConfig().RABBITMQ_URL;
    if (!url) throw new Error("RABBITMQ_URL not defined");

    const connection = await amqp.connect(url);
    channel = await connection.createChannel();

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

    logger.info("Sensor service connected to RabbitMQ");
  } catch (error) {
    logger.fatal(error, "Failed to connect to RabbitMQ");
    throw error;
  }
}

export function consumeSensors(
  onMessage: (payload: any) => Promise<void>
): void {
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
    logger.error(error, "Failed to publish sensor reading");
    throw error;
  }
}

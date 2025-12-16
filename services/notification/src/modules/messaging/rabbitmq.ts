import amqp, { Channel, ConsumeMessage } from "amqplib";
import { envConfig } from "../../config/envConfig";
import { logger } from "../logger/logger";
import {
  EXCHANGES,
  QUEUES,
  ROUTING_KEYS
} from "./rabbitmq.constants";

let channel: Channel;

export async function connectRabbitMQ(
  onMessage: (payload: any) => Promise<void>
): Promise<void> {
  const url = envConfig().RABBITMQ_URL;

  if (!url) {
    throw new Error("RABBITMQ_URL not defined");
  }

  const connection = await amqp.connect(url);
  channel = await connection.createChannel();

  // Exchange do tipo topic
  await channel.assertExchange(
    EXCHANGES.SENSOR_READINGS,
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

  await channel.consume(
    QUEUES.NOTIFICATION,
    async (msg: ConsumeMessage | null) => {
      if (!msg) return;

      try {
        const payload = JSON.parse(msg.content.toString());
        await onMessage(payload);

        channel.ack(msg);
      } catch (error) {
        logger.error(error, "Failed to process message");
        channel.nack(msg, false, false); // descarta mensagem
      }
    }
  );

  logger.info(
    {
      exchange: EXCHANGES.SENSOR_READINGS,
      queue: QUEUES.NOTIFICATION,
      routingKey: ROUTING_KEYS.SENSOR_READING_CREATED
    },
    "Connected to RabbitMQ (topic exchange) and waiting for messages"
  );
}

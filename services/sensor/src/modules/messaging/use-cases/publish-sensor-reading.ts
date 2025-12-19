import { logger } from "../../logger/logger";
import { getChannel } from "../rabbitmq";
import { EXCHANGES, ROUTING_KEYS } from "../rabbitmq.constants";

export async function publishSensorReading(message: object) {
  try {

    const channel = await getChannel();

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

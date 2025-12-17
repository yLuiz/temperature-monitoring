import { Sensor } from "../../database/postgres/entities/Sensor";
import { logger } from "../../logger/logger";
import { getChannel, SensorListUpdatedMessage } from "../rabbitmq";
import { EXCHANGES, ROUTING_KEYS } from "../rabbitmq.constants";

export async function publishSensorListUpdated(
    sensors: Sensor[]
): Promise<void> {

    const channel = await getChannel();

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
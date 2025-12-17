import { logger } from "../../logger/logger";
import { getChannel } from "../rabbitmq";
import { EXCHANGES, ROUTING_KEYS } from "../rabbitmq.constants";


export async function askForSensorListUpdate() {
    try {
        const channel = await getChannel();

        if (!channel) {
            throw new Error("RabbitMQ channel not initialized");
        }

        const payload = Buffer.from(JSON.stringify({ request: "update_sensor_list" }));

        channel.publish(
            EXCHANGES.SENSORS,
            ROUTING_KEYS.SENSOR_LIST_REQUEST,
            payload,
            { persistent: true }
        );

    }
    catch (error) {
        logger.error(error, "Failed to ask for sensor list update");
        throw error;
    }
}

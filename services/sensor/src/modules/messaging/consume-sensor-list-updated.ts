import { ISensor, MockSensorsReading } from "../../mocks/sensors.mock";
import { logger } from "../logger/logger";
import { consumeSensors } from "./rabbitmq";

export async function consumeSensorListUpdated() {
    try {
        logger.info("Consuming sensor list updated messages");
        consumeSensors(async (message: { sensors: ISensor[] }) => {
            MockSensorsReading.sensors = message.sensors;
        });

    }
    catch (error) {
        logger.error(error, "Failed to consume sensor list updated messages");
        throw error;
    }
}
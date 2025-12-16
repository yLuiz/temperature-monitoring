import { ProcessingReadingsConsumedUseCase } from "../../application/use-cases/sensor-readings/processing-readings-consumed.use-case";
import { SensorRepositoryInstance } from "../database/postgres/repositories/sensor.repository";
import { logger } from "../logger/logger";
import { consumeSensorListRequest, publishSensorListUpdated, startSensorReadingConsumer } from "./rabbitmq";

const processingReadingsConsumedUseCase = new ProcessingReadingsConsumedUseCase();

export async function runRabbitMQConsumers() {
    await startSensorReadingConsumer(async (message) => await processingReadingsConsumedUseCase.execute(message));
    await consumeSensorListRequest(async _ => {
        const sensorsToSend = await SensorRepositoryInstance.getAll();
        await publishSensorListUpdated(sensorsToSend);

        logger.info("Processed sensor list request and published updated sensor list");
    });
}
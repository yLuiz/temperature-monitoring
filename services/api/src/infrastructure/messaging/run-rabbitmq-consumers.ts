import { ProcessingReadingsConsumedUseCase } from "../../application/use-cases/sensor-readings/processing-readings-consumed.use-case";
import { startSensorReadingConsumer } from "./rabbitmq";

const processingReadingsConsumedUseCase = new ProcessingReadingsConsumedUseCase();

export async function runRabbitMQConsumers() {
    await startSensorReadingConsumer(async (message) => await processingReadingsConsumedUseCase.execute(message));
}
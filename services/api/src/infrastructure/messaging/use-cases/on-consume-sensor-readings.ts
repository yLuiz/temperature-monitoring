import { ProcessingReadingsConsumedUseCase } from "../../../application/use-cases/sensor-readings/processing-readings-consumed.use-case";
import { SensorReadingMessage } from "../rabbitmq";

export async function onConsumeSensorReadings(payload: SensorReadingMessage) {
    const processingReadingsConsumedUseCase = new ProcessingReadingsConsumedUseCase();
    await processingReadingsConsumedUseCase.execute(payload);
}
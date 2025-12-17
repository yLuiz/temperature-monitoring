import { ProcessingReadingsConsumedUseCase } from "../../../application/use-cases/sensor-readings/processing-readings-consumed.use-case";
import { onConsumeSensorListRequest } from "../use-cases/on-consume-sensor-list-request";
import { consumeSensorListRequest } from "./consumeSensorListRequest";
import { consumeSensorReadings } from "./consumeSensorReadings";

export async function runRabbitMQConsumers() {

    const processingReadingsConsumedUseCase = new ProcessingReadingsConsumedUseCase();

    await consumeSensorReadings(processingReadingsConsumedUseCase.execute.bind(processingReadingsConsumedUseCase));
    await consumeSensorListRequest(payload => onConsumeSensorListRequest(payload));
}
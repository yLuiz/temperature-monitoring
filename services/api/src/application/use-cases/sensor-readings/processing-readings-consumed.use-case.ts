import { logger } from "../../../infrastructure/logger/logger";
import { SensorReadingMessage } from "../../../infrastructure/messaging/rabbitmq";
import { GetSensorByCodeUseCase } from "../sensors/get-sensor-by-code.use-case";
import { RegisterSensorReadingUseCase } from "./register-sensor-reading.use-case";

export class ProcessingReadingsConsumedUseCase {

    private readonly _registerSensorReadingUseCase: RegisterSensorReadingUseCase;
    private readonly _getSensorByCodeUseCase: GetSensorByCodeUseCase;

    constructor() {
        this._registerSensorReadingUseCase = new RegisterSensorReadingUseCase();
        this._getSensorByCodeUseCase = new GetSensorByCodeUseCase();
    }

    async execute(reading: SensorReadingMessage): Promise<void> {

        logger.info({ reading }, "Received sensor reading in API");

        const sensor = await this._getSensorByCodeUseCase.execute(reading.sensorCode);

        if (!sensor) {
            logger.warn(
                { sensorCode: reading.sensorCode },
                "Sensor not found for incoming reading"
            );
            return;
        }

        try {
            await this._registerSensorReadingUseCase.execute({
                sensor_id: sensor.id,
                temperature: reading.temperature,
                humidity: reading.humidity,
                recorded_at: new Date(reading.timestamp)
            });
        }
        catch (error) {
            console.error("Error processing sensor reading:", (error as any).message);
        }
    }
}
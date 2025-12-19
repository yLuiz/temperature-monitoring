import { SensorRepositoryInstance, SensorRepositoryType } from "../../../infrastructure/database/postgres/repositories/sensor.repository";
import { logger } from "../../../infrastructure/logger/logger";
import { SensorReadingMessage } from "../../../infrastructure/messaging/rabbitmq";

import { RegisterSensorReadingUseCase } from "./register-sensor-reading.use-case";

export class ProcessingReadingsConsumedUseCase {
    
    private readonly _registerSensorReadingUseCase: RegisterSensorReadingUseCase;
    private readonly _sensorRepository: SensorRepositoryType;

    constructor() {
        this._registerSensorReadingUseCase = new RegisterSensorReadingUseCase();
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute(reading: SensorReadingMessage): Promise<void> {

        logger.info({ reading }, "Received sensor reading in API");

        const sensor = await this._sensorRepository.getBySensorCode(reading.sensorCode);

        if (!sensor) {
            logger.warn(
                { sensorCode: reading.sensorCode },
                "Sensor not found for incoming reading"
            );
            return;
        }

        await this._registerSensorReadingUseCase.execute({
            sensor_id: sensor.id,
            temperature: reading.temperature,
            humidity: reading.humidity,
            recorded_at: new Date(reading.timestamp)
        });
    }
}
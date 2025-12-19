import { SensorReading } from "../../../infrastructure/database/postgres/entities/SensorReadings";
import { SensorReadingsRepositoryInstance, SensorReadingsRepositoryType } from "../../../infrastructure/database/postgres/repositories/sensor-readings.repository";
import { CreateSensorReadingInterface } from "../../interfaces/sensor-reading/create-sensor-reading.interface";

export class RegisterSensorReadingUseCase {

    private readonly _sensorReadingsRepository: SensorReadingsRepositoryType;

    constructor() { 
        this._sensorReadingsRepository = SensorReadingsRepositoryInstance;
    }

    execute(readingData: CreateSensorReadingInterface): Promise<SensorReading> {
        return this._sensorReadingsRepository.create(readingData);
    }
}
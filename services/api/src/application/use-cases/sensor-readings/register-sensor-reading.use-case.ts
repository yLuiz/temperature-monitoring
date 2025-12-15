import { SensorReading } from "../../../infrastructure/database/postgres/entities/SensorReadings";
import { ISensorReadingsRepository, SensorReadingsRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor-readings.repository";
import { CreateSensorReadingInterface } from "../../interfaces/sensor-reading/create-sensor-reading.interface";

export class RegisterSensorReadingUseCase {

    private readonly _sensorReadingsRepository: ISensorReadingsRepository;

    constructor() { 
        this._sensorReadingsRepository = SensorReadingsRepositoryInstance;
    }

    execute(readingData: CreateSensorReadingInterface): Promise<SensorReading> {
        return this._sensorReadingsRepository.create(readingData);
    }
}
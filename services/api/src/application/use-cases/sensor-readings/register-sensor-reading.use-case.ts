import { ISensorReadingsRepository, SensorReadingsRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor-readings.repository";
import { CreateSensorReadingInterface } from "../../interfaces/sensor-reading/create-sensor-reading.interface";

export class RegisterSensorReadingUseCase {

    private readonly _sensorReadingsRepository: ISensorReadingsRepository;

    constructor() { 
        this._sensorReadingsRepository = SensorReadingsRepositoryInstance;
    }

    execute(readingData: CreateSensorReadingInterface) {
        return this._sensorReadingsRepository.create(readingData);
    }
}
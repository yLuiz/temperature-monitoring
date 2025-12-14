import { ISensorReadingsRepository, SensorReadingsRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor-readings.repository";

export class RecordReadingUseCase {
    private readonly _sensorReadingsRepository: ISensorReadingsRepository;

    constructor() {
        this._sensorReadingsRepository = SensorReadingsRepositoryInstance;
    }

    async execute(sensorId: string, readingData: any): Promise<any> {
        // Logic to record a new reading for the given sensorId with the provided readingData
        return {};
    }
}
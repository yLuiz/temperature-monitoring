import { ISensorReadingsRepository, SensorReadingsRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor-readings.repository";

export class GetLatestReadingsUseCase {
    private readonly _sensorReadingsRepository: ISensorReadingsRepository;

    constructor() {
        this._sensorReadingsRepository = SensorReadingsRepositoryInstance;
    }

    async execute(sensorId: string): Promise<any> {
        this._sensorReadingsRepository.getAll()
    }

}
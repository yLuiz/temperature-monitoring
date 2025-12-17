import { Sensor } from "../../../infrastructure/database/postgres/entities/Sensor";
import { SensorRepositoryType, SensorRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor.repository";

export class GetLatestReadingsUseCase {
    private readonly _sensorRepository: SensorRepositoryType;

    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute(): Promise<Sensor[]> {
        return await this._sensorRepository.getLatestSensorsReading();
    }

}
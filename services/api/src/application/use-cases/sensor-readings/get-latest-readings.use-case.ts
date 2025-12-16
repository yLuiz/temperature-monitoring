import { Sensor } from "../../../infrastructure/database/postgres/entities/Sensor";
import { ISensorRepository, SensorRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor.repository";
import { NotFoundException } from "../../../infrastructure/http/exceptions/NotFoundException";

export class GetLatestReadingsUseCase {
    private readonly _sensorRepository: ISensorRepository;

    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute(): Promise<Sensor[]> {
        return await this._sensorRepository.getLatestSensorsReading();
    }

}
import { Sensor } from "../../../infrastructure/database/postgres/entities/Sensor";
import { SensorRepositoryType, SensorRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor.repository";

export class GetSensorByCodeUseCase {

    private readonly _sensorRepository: SensorRepositoryType;
    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute(sensorCode: string): Promise<Sensor | null> {
        return await this._sensorRepository.getBySensorCode(sensorCode);
    }
}
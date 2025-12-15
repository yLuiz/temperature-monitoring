import { Sensor } from "../../../infrastructure/database/postgres/entities/Sensor";
import { ISensorRepository, SensorRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor.repository";

export class GetSensorByCodeUseCase {

    private readonly _sensorRepository: ISensorRepository;

    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute(sensorCode: string): Promise<Sensor | null> {
        return this._sensorRepository.getBySensorCode(sensorCode);
    }
}
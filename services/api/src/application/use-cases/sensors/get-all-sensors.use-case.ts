import { SensorRepositoryType, SensorRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor.repository";

export class GetAllSensorsUseCase {

    private readonly _sensorRepository: SensorRepositoryType;

    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute() {
        return await this._sensorRepository.getAll();
    }
}
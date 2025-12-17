import { SensorRepositoryType, SensorRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor.repository";

export class GetSensorByIdUseCase {

    private readonly _sensorRepository: SensorRepositoryType;

    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute(id: string) { 
        return await this._sensorRepository.getById(id);
    }
}
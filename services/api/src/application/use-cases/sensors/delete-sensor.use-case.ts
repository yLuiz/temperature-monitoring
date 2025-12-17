import { SensorRepositoryInstance, SensorRepositoryType } from "../../../infrastructure/database/postgres/repositories/sensor.repository";

export class DeleteSensorUseCase {

    private readonly _sensorRepository: SensorRepositoryType;

    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute(id: string) {
        return await this._sensorRepository.delete(id);
    }
}
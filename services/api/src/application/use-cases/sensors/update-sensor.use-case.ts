import { SensorRepositoryType, SensorRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor.repository";
import { UpdateSensorInterface } from "../../interfaces/sensor/update-sensor.interface";

export class UpdateSensorUseCase {

    private readonly _sensorRepository: SensorRepositoryType;
    
    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute(id: string, sensorData: UpdateSensorInterface) {
        return await this._sensorRepository.update(id, sensorData);
    }
}
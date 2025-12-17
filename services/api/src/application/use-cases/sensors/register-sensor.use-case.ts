import { SensorRepositoryType, SensorRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor.repository";
import { CreateSensorInterface } from "../../interfaces/sensor/create-sensor.interface";

export class RegisterSensorUseCase {

    private readonly _sensorRepository: SensorRepositoryType;

    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute(sensorData: CreateSensorInterface): Promise<any> {
        return await this._sensorRepository.create(sensorData);
    }
}
import { SensorRepositoryType, SensorRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor.repository";
import { BadRequestException } from "../../../infrastructure/http/exceptions/BadRequestException";
import { CreateSensorInterface } from "../../interfaces/sensor/create-sensor.interface";

export class RegisterSensorUseCase {

    private readonly _sensorRepository: SensorRepositoryType;

    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute(sensorData: CreateSensorInterface): Promise<any> {

        const existingSensor = await this._sensorRepository.getBySensorCode(sensorData.sensor_code);
        if (existingSensor) {
            throw new BadRequestException(`Sensor with code ${sensorData.sensor_code} already exists`);
        }

        if (sensorData.max_humidity <= sensorData.min_humidity) {
            throw new BadRequestException(`Max humidity must be greater than min humidity`);
        }

        if (sensorData.max_temperature <= sensorData.min_temperature) {
            throw new BadRequestException(`Max temperature must be greater than min temperature`);
        }

        return await this._sensorRepository.create(sensorData);
    }
}
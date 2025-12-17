import { SensorRepositoryType, SensorRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor.repository";
import { BadRequestException } from "../../../infrastructure/http/exceptions/BadRequestException";
import { NotFoundException } from "../../../infrastructure/http/exceptions/NotFoundException";
import { UpdateSensorInterface } from "../../interfaces/sensor/update-sensor.interface";

export class UpdateSensorUseCase {

    private readonly _sensorRepository: SensorRepositoryType;

    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute(id: string, sensorData: UpdateSensorInterface) {

        const existingSensor = await this._sensorRepository.getById(id);
        if (!existingSensor) {
            throw new NotFoundException(`Sensor not found`);
        }
        const hasMaxAndMinHumidity = sensorData?.max_humidity !== undefined && sensorData?.min_humidity !== undefined;
        const hasMaxAndMinTemperature = sensorData?.max_temperature !== undefined && sensorData?.min_temperature !== undefined;

        if (hasMaxAndMinHumidity && sensorData.max_humidity! <= sensorData.min_humidity!) {
            throw new BadRequestException(`Max humidity must be greater than min humidity`);
        }

        if (hasMaxAndMinTemperature && sensorData.max_temperature! <= sensorData.min_temperature!) {
            throw new BadRequestException(`Max temperature must be greater than min temperature`);
        }

        const sensorCodeExisting = await this._sensorRepository.getBySensorCode(sensorData.sensor_code!);
        if (sensorCodeExisting && sensorCodeExisting.id !== id) {
            throw new BadRequestException(`Sensor with code ${sensorData.sensor_code} already exists`);
        }

        return await this._sensorRepository.update(id, sensorData);
    }
}
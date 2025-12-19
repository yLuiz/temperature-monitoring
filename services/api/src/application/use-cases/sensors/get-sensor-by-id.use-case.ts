import { SensorRepositoryInstance, SensorRepositoryType } from "../../../infrastructure/database/postgres/repositories/sensor.repository";
import { NotFoundException } from "../../../infrastructure/http/exceptions/NotFoundException";

export class GetSensorByIdUseCase {

    private readonly _sensorRepository: SensorRepositoryType;

    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute(id: string) { 
        const sensor = await this._sensorRepository.getById(id);
        
        if (!sensor) {
            throw new NotFoundException('Sensor not found');
        }
        
        return sensor;
    }
}
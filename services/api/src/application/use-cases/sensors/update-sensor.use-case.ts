import { ISensorRepository, SensorRepositoryInstance } from "../../../infrastructure/database/postgres/repositories/sensor.repository";
import { UpdateSensorInterface } from "../../interfaces/sensor/update-sensor.interface";

export class UpdateSensorUseCase {

    private readonly _sensorRepository: ISensorRepository;
    
    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    execute(sensorData: UpdateSensorInterface) { }
}
import { SensorRepositoryInstance, SensorRepositoryType } from "../../../infrastructure/database/postgres/repositories/sensor.repository";
import { publishSensorListUpdated } from "../../../infrastructure/messaging/publishers/publish-sensor-list-updated";

export class EmitSensorDatabaseUpdate {

    private readonly _sensorRepository: SensorRepositoryType;

    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
    }

    async execute() {
        const sensors = await this._sensorRepository.getAll();
        publishSensorListUpdated(sensors);
    }
}
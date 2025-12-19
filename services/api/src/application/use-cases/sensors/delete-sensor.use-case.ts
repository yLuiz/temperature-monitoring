import { SensorRepositoryInstance, SensorRepositoryType } from "../../../infrastructure/database/postgres/repositories/sensor.repository";
import { NotFoundException } from "../../../infrastructure/http/exceptions/NotFoundException";
import { publishSensorListUpdated } from "../../../infrastructure/messaging/publishers/publish-sensor-list-updated";
import { EmitSensorDatabaseUpdate } from "./emit-sensor-database-update";

export class DeleteSensorUseCase {

    private readonly _sensorRepository: SensorRepositoryType;
    private readonly _emitSensorDatabaseUpdate: EmitSensorDatabaseUpdate;
    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
        this._emitSensorDatabaseUpdate = new EmitSensorDatabaseUpdate();
    }

    async execute(id: string) {
        const sensor = await this._sensorRepository.getById(id);
        if (!sensor) {
            throw new NotFoundException(`Sensor not found`);
        }
        await this._sensorRepository.delete(id);

        this._emitSensorDatabaseUpdate.execute();
    }
}
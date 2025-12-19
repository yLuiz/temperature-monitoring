import { Repository } from "typeorm";
import { CreateSensorReadingInterface } from "../../../../application/interfaces/sensor-reading/create-sensor-reading.interface";
import { UpdateSensorReadingInterface } from "../../../../application/interfaces/sensor-reading/update-sensor-reading.interface";
import { AppDataSource } from "../data-source";
import { SensorReading } from "../entities/SensorReadings";

class SensorReadingsRepository {

    private _sensorReadingOrmRepository: Repository<SensorReading>;

    constructor() {
        this._sensorReadingOrmRepository = AppDataSource.getRepository(SensorReading);
    }

    async getAll() {
        return await this._sensorReadingOrmRepository.find({
            order: { recorded_at: "ASC" }
        });
    }

    async getById(id: string) {
        return await this._sensorReadingOrmRepository.findOne({
            where: { id }
        });
    }

    async getBySensorCode(sensor_code: string): Promise<SensorReading[]> {
        return await this._sensorReadingOrmRepository.find({
            where: {
                sensor: { sensor_code }
            },
            order: { recorded_at: "ASC" }
        });
    }

    async create(readingData: CreateSensorReadingInterface): Promise<SensorReading> {
        const reading = this._sensorReadingOrmRepository.create(readingData);
        return await this._sensorReadingOrmRepository.save(reading);
    }

    async update(id: string, readingData: UpdateSensorReadingInterface): Promise<void> {
        await this._sensorReadingOrmRepository.update(id, readingData);
    }

    async delete(id: string): Promise<void> {
        await this._sensorReadingOrmRepository.delete(id);
    }
}

export const SensorReadingsRepositoryInstance = new SensorReadingsRepository();
export type SensorReadingsRepositoryType = SensorReadingsRepository;
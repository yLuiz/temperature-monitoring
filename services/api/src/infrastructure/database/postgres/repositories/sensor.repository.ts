import { Repository } from "typeorm";
import { CreateSensorInterface } from "../../../../application/interfaces/sensor/create-sensor.interface";
import { UpdateSensorInterface } from "../../../../application/interfaces/sensor/update-sensor.interface";
import { AppDataSource } from "../data-source";
import { Sensor } from "../entities/Sensor";

class SensorRepository {
    private _sensorOrmRepository: Repository<Sensor>;

    constructor() {
        this._sensorOrmRepository = AppDataSource.getRepository(Sensor);
    }

    async getAll(): Promise<Sensor[]> {
        return this._sensorOrmRepository.find({
            order: { created_at: "ASC" }
        });
    }

    async getById(id: string): Promise<Sensor | null> {
        return this._sensorOrmRepository.findOne({
            where: { id }
        });
    }

    async getLatestSensorsReading() {

        const query = `
        reading.recorded_at = (
          SELECT MAX(sr.recorded_at)
          FROM sensor_readings sr
          WHERE sr.sensor_id = sensor.id
        )`

        return this._sensorOrmRepository
            .createQueryBuilder("sensor")
            .leftJoinAndSelect(
                "sensor.readings",
                "reading",
                query
            )
            .orderBy("sensor.created_at", "ASC")
            .getMany();
    }


    async getBySensorCode(sensor_code: string): Promise<Sensor | null> {
        return this._sensorOrmRepository.findOne({
            where: { sensor_code }
        });
    }

    async create(sensorData: CreateSensorInterface): Promise<Sensor> {
        const sensor = this._sensorOrmRepository.create(sensorData);
        return this._sensorOrmRepository.save(sensor);
    }

    async update(
        id: string,
        sensorData: UpdateSensorInterface
    ): Promise<Sensor | null> {
        const sensor = await this.getById(id);
        if (!sensor) return null;

        Object.assign(sensor, sensorData);
        return this._sensorOrmRepository.save(sensor);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this._sensorOrmRepository.delete(id);
        return result.affected === 1;
    }
}

export const SensorRepositoryInstance = new SensorRepository();
export type ISensorRepository = SensorRepository;
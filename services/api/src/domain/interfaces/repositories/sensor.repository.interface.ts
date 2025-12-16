import { SensorReading } from "../../entities/sensor-reading.entity";

export interface SensorReadingRepositoryInterface {
  save(sensorReading: SensorReading): Promise<SensorReading>;
  findById(id: string): Promise<SensorReading | null>;
  findBySensorId(sensorId: string): Promise<SensorReading[]>;
}
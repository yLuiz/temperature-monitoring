import { Sensor } from "../../infrastructure/database/postgres/entities/Sensor";
import { SensorReadingToTemplateInterface } from "../interfaces/sensor-reading/sensor-reading-to-template.interface";

export class SensorReadingMapper {
    static toTemplate(sensor: Sensor): SensorReadingToTemplateInterface {

        const result: SensorReadingToTemplateInterface = {
            sensorId: sensor.id,
            sensorCode: sensor.sensor_code,
            name: sensor.name,
            sensor: {
                id: sensor.id,
                name: sensor.name,
                sensorCode: sensor.sensor_code
            },
            temperature: sensor.readings[0]?.temperature,
            humidity: sensor.readings[0]?.humidity,
            updatedAt: sensor.readings[0]?.recorded_at.toISOString(),
        }

        return result;
    }
}
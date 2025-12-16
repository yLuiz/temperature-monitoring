import { ISensorReadingToSend } from "../models/sensor-reading.model";
import { random } from "../utils/random.util";

export interface ISensor { 
    sensor_code: string, 
    min_temperature: number, 
    max_temperature: number, 
    min_humidity: number, 
    max_humidity: number 
}

export class MockSensorsReading {

    private readonly _sensorsMock: { sensor_code: string, min_temperature: number, max_temperature: number, min_humidity: number, max_humidity: number }[] = [
        { sensor_code: "SENSOR_001", min_temperature: 0, max_temperature: 5, min_humidity: 75, max_humidity: 90 },
        { sensor_code: "SENSOR_002", min_temperature: 0, max_temperature: 4, min_humidity: 80, max_humidity: 95 },
        { sensor_code: "SENSOR_003", min_temperature: -25, max_temperature: -18, min_humidity: 60, max_humidity: 80 },
    ];

    static sensors: ISensor[] = [];

    static generate(): ISensorReadingToSend[] {
        const now = new Date();
        const readings: ISensorReadingToSend[] = [];

        for (const sensor of this.sensors) {

            const minTemperature = sensor.min_temperature < 0 ? sensor.min_temperature - 5 : sensor.min_temperature + 5;
            const maxTemperature = sensor.max_temperature < 0 ? sensor.max_temperature - 5 : sensor.max_temperature + 5;
            const minHumidity = sensor.min_humidity + 5; // Considerando que não haverão valores negativos.
            const maxHumidity = sensor.max_humidity + 5; // Considerando que não haverão valores negativos.

            const reading: ISensorReadingToSend = {
                sensorCode: sensor.sensor_code,
                temperature: random(minTemperature, maxTemperature),
                humidity: random(minHumidity, maxHumidity),
                timestamp: now.toISOString()
            };

            readings.push(reading);
        }

        return readings;
    }
}
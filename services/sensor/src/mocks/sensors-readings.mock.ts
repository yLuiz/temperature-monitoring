import { ISensorReadingToSend } from "../models/sensor-reading.model";
import { ISensor } from "../models/sensor.model";
import { random } from "../utils/random.util";

export class MockSensorsReadings {
    static generate(sensors: ISensor[]): ISensorReadingToSend[] {
        const now = new Date();
        const readings: ISensorReadingToSend[] = [];

        for (const sensor of sensors) {
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
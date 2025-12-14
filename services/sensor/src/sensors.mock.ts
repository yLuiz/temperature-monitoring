import { ISensorReading } from "./models/sensor-reading.model";
import { random } from "./utils/random.util";



export class MockSensorsReading {

    private readonly _sensorsMock: { sensorCode: string }[] = [
        { sensorCode: "SENSOR_001", },
        { sensorCode: "SENSOR_002", },
        { sensorCode: "SENSOR_003", },
    ];


    static generate(): ISensorReading[] {
        const now = new Date();
        const readings: ISensorReading[] = [];

        for (const sensor of new MockSensorsReading()._sensorsMock) {
            const reading: ISensorReading = {
                sensorCode: sensor.sensorCode,
                temperature: random(15, 35),
                humidity: random(30, 80),
                timestamp: now.toISOString()
            };

            readings.push(reading);
        }

        return readings;
    }
}
import { InMemoryDatabase, ISensor } from "./in-memory-database";

export class DatabaseInstance extends InMemoryDatabase {

    static db = new DatabaseInstance();

    database = {
        sensors: this.sensors,
        readings: this.readings
    }

    constructor() {
        super();
        this._seedSensors();
        this._seedReadings();
    }

    private _seedSensors() {
        const sensorsMock: ISensor[] = [
            { id: "sensor-1", name: "Sensor 1", sensorCode: "SENSOR_001" },
            { id: "sensor-2", name: "Sensor 2", sensorCode: "SENSOR_002" },
            { id: "sensor-3", name: "Sensor 3", sensorCode: "SENSOR_003" },
        ];

        sensorsMock.forEach(sensorMock => {
            this.sensors.save({
                id: sensorMock.id,
                name: sensorMock.name,
                sensorCode: sensorMock.sensorCode
            });
        });
    }

    private _seedReadings() {
        const now = new Date();
        const readingsPerSensor = 5;
        const sensors = this.sensors.getAll();

        sensors.forEach(sensor => {
            for (let i = 0; i < readingsPerSensor; i++) {
                const readingTime = new Date(now.getTime() - (readingsPerSensor - i) * 60000); // 1 minuto de intervalo
                this.readings.save({
                    sensorId: sensor.id,
                    sensor: sensor,
                    temperature: parseFloat((20 + Math.random() * 10).toFixed(2)), // Temperatura entre 20 e 30
                    humidity: parseFloat((40 + Math.random() * 20).toFixed(2)),    // Humidade entre 40 e 60
                    updatedAt: readingTime.toISOString()
                });
            }
        });
    }

}
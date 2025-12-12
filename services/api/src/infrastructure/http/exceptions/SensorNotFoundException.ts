export class SensorNotFoundException extends Error {
    constructor(sensorId: string) {
        super(`Sensor with ID ${sensorId} not found.`);
        this.name = "SensorNotFoundException";
    }
}
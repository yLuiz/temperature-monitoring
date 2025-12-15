import { CreateSensorInterface } from "../../interfaces/sensor/create-sensor.interface";

export class RegisterSensorUseCase {

    constructor() {}

    async execute(sensorData: CreateSensorInterface): Promise<any> {
        // Logic to register a new sensor with the provided sensorData
        return {};
    }
}
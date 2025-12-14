export interface CreateSensorReadingInterface {
    temperature: number;
    humidity: number;
    sensor_id: string;
    recordedAt: Date;
}
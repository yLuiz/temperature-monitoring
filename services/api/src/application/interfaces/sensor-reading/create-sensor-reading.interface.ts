export interface CreateSensorReadingInterface {
    temperature: number;
    humidity: number;
    sensor_id: string;
    recorded_at: Date;
}
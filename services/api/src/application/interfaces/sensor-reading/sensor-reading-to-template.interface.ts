export interface SensorReadingToTemplateInterface {
    sensorId: string;
    sensorCode: string;
    name: string;
    sensor: {
        id: string;
        name: string;
        sensorCode: string;
    };
    temperature: number;
    humidity: number;
    updatedAt: string;
}
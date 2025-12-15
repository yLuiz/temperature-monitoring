export interface ISensorReadingToSend {
    sensorCode: string;
    temperature: number;
    humidity: number;
    timestamp: string;
}
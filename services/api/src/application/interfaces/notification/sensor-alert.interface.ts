export interface SensorAlertInterface {
    sensor_code: string;
    metric: {
        type: "TEMPERATURE" | "HUMIDITY";
        value: number;
    };
    occurred_at: string;
    message: string;
}
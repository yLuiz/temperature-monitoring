export enum MetricTypeEnum {
    TEMPERATURE = "TEMPERATURE",
    HUMIDITY = "HUMIDITY"
}

export enum MetricParameterEnum {
    MIN = "MIN",
    MAX = "MAX"
}

export interface SensorAlertInterface {
    sensor_code: string;
    metric: {
        type: MetricTypeEnum;
        value: number;
        limit: number;
        parameter: MetricParameterEnum;
    };
    occurred_at: string;
    message: string;
}
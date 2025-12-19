import { MetricParameterEnum, MetricTypeEnum } from "./sensor-alert.interface";

export interface CreateAlertInterface {
  sensor_id: string;
  type: MetricTypeEnum;
  parameter: MetricParameterEnum;
  value: number;
  limit: number;
  diff: number;
  occurred_at: Date;
  message: string;
}

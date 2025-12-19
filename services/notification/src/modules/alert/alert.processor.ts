import { ISensorReadingPayload } from "../../models/sensor-reading.payload";
import { logger } from "../logger/logger";
import { publishSensorAlert } from "../messaging/publishers/publish-sensor-alert";
import { getSensorByCodeInCache } from "../sensors/get-sensor-by-code-in-cache";

export enum MetricTypeEnum {
  TEMPERATURE = "TEMPERATURE",
  HUMIDITY = "HUMIDITY"
}

export enum MetricParameterEnum {
  MIN = "MIN",
  MAX = "MAX"
}

export interface SensorAlertPayload {
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

export async function processSensorReading(reading: ISensorReadingPayload) {
  const { sensorCode, temperature, humidity } = reading;

  const sensor = await getSensorByCodeInCache(sensorCode);

  if (sensor && (temperature < sensor.min_temperature || temperature > sensor.max_temperature)) {

    const payload: SensorAlertPayload = {
      sensor_code: sensorCode,
      metric: {
        type: MetricTypeEnum.TEMPERATURE,
        value: temperature,
        limit: temperature < sensor.min_temperature ? sensor.min_temperature : sensor.max_temperature,
        parameter: temperature < sensor.min_temperature ? MetricParameterEnum.MIN : MetricParameterEnum.MAX,
      },
      occurred_at: new Date().toISOString(),
      message: `Temperature ${temperature}°C out of bounds (${sensor.min_temperature}°C | ${sensor.max_temperature}°C)`,
    }

    publishSensorAlert(payload);

    logger.warn(
      { sensorCode, temperature },
      "Temperature limit exceeded"
    );
  }

  if (sensor && (humidity < sensor.min_humidity || humidity > sensor.max_humidity)) {

    const payload: SensorAlertPayload = {
      sensor_code: sensorCode,
      metric: {
        type: MetricTypeEnum.HUMIDITY,
        value: humidity,
        limit: humidity < sensor.min_humidity ? sensor.min_humidity : sensor.max_humidity,
        parameter: humidity < sensor.min_humidity ? MetricParameterEnum.MIN : MetricParameterEnum.MAX,
      },
      occurred_at: new Date().toISOString(),
      message: `Humidity ${humidity}% out of bounds (${sensor.min_humidity}% | ${sensor.max_humidity}%)`,
    }

    publishSensorAlert(payload);

    logger.warn(
      { sensorCode, humidity },
      "Humidity limit exceeded"
    );
  }

  // logger.info(
  //   { sensorCode, temperature, humidity },
  //   "Sensor reading processed"
  // );
}

import { ISensorReadingPayload } from "../../models/sensor-reading.payload";
import { logger } from "../logger/logger";
import { publishSensorAlert } from "../messaging/publishers/publish-sensor-alert";
import { getSensorByCodeInCache } from "../sensors/get-sensor-by-code-in-cache";

export interface SensorAlertPayload {
  sensor_code: string;
  metric: {
    type: "TEMPERATURE" | "HUMIDITY";
    value: number;
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
        type: "TEMPERATURE",
        value: temperature,
      },
      occurred_at: new Date().toISOString(),
      message: `Temperature ${temperature}°C out of bounds (${sensor.min_temperature}°C - ${sensor.max_temperature}°C)`,
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
        type: "HUMIDITY",
        value: humidity,
      },
      occurred_at: new Date().toISOString(),
      message: `Humidity ${humidity}% out of bounds (${sensor.min_humidity}% - ${sensor.max_humidity}%)`,
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

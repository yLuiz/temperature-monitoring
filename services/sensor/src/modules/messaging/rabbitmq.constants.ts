export const EXCHANGES = {
  SENSORS: "sensors.exchange",
  SENSOR_READINGS: "sensor.readings.exchange",
};

export const ROUTING_KEYS = {
  SENSOR_READING_CREATED: "sensor.reading.created",
  SENSOR_LIST_REQUEST: "sensor.list.request",
  SENSOR_LIST_UPDATED: "sensor.list.updated",
};

export const QUEUES = {
  NOTIFICATION: "notification.readings.queue",
  SENSOR_LIST_REQUEST: "sensor.list.request.queue",
  SENSOR_SERVICE_SENSOR_LIST_UPDATED: "sensor.service.sensor-list-updated.queue",
};
export const EXCHANGES = {
  SENSORS: "sensors.exchange",
  SENSOR_READINGS: "sensor.readings.exchange",
  NOTIFICATION_SENSOR_ALERTS: "notification.sensor.alerts.exchange",
};

export const QUEUES = {
  API_READINGS: "api.readings.queue",
  SENSOR_LIST_REQUEST: "sensor.list.request.queue",
  NOTIFICATION_SENSOR_LIST_UPDATED: "notification.sensor-list-updated.queue",
  NOTIFICATION_SENSOR_LIST_REQUEST: "notification.sensor-list-request.queue",
  NOTIFICATION_SENSOR_ALERT: "notification.sensor.alert.queue",
};

export const ROUTING_KEYS = {
  SENSOR_READING_CREATED: "sensor.reading.created",
  SENSOR_LIST_UPDATED: "sensor.list.updated",
  SENSOR_LIST_REQUEST: "sensor.list.request",
  NOTIFICATION_SENSOR_ALERT: "notification.sensor.alert",
};
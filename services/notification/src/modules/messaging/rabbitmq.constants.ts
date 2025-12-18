export const EXCHANGES = {
  SENSORS: "sensors.exchange",
  SENSOR_READINGS: "sensor.readings.exchange",
  NOTIFICATION_SENSOR_ALERTS: "notification.sensor.alerts.exchange",
};

export const ROUTING_KEYS = {
  SENSOR_READING_CREATED: "sensor.reading.created",
  SENSOR_LIST_UPDATED: "sensor.list.updated",
  NOTIFICATION_SENSOR_ALERT: "notification.sensor.alert",
};

export const QUEUES = {
  NOTIFICATION: "notification.readings.queue",
  NOTIFICATION_SENSOR_LIST_UPDATED: "notification.sensor.list.updated.queue",
};
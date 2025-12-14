import * as dotenv from "dotenv";
dotenv.config();

export const envConfig = () => ({
    RABBITMQ_URL: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672/',
    SENSOR_INTERVAL_MS: Number(process.env.SENSOR_INTERVAL_MS) || 3000
})
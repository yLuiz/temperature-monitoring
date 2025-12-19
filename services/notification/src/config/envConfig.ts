import * as dotenv from "dotenv";
dotenv.config({ override: false });

export const envConfig = () => ({
    RABBITMQ_URL: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672/',
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
})
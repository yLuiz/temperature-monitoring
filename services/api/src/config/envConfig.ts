import * as dotenv from "dotenv";
dotenv.config({ override: false });

export const envConfig = () => ({
    RABBITMQ_URL: process.env.RABBITMQ_URL || "amqp://localhost",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    DB_USER: process.env.DB_USER || "user",
    DB_PASSWORD: process.env.DB_PASSWORD || "password",
    DB_NAME: process.env.DB_NAME || "database",
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
});
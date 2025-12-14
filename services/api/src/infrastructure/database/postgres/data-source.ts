import { DataSource } from "typeorm";
import { Sensor } from "./entities/Sensor";

import dotenv from "dotenv";
import { SensorReading } from "./entities/SensorReadings";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    entities: [Sensor, SensorReading],
    migrations: ["dist/infrastructure/database/postgres/migrations/*.{js,ts}"],

    synchronize: false, // nunca true em produção
    logging: false
});

import "reflect-metadata";


import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { envConfig } from "../../../config/envConfig";
dotenv.config({ override: false });

export const AppDataSource = new DataSource({
    type: "postgres",
    host: envConfig().DB_HOST,
    port: envConfig().DB_PORT,
    username: envConfig().DB_USER,
    password: envConfig().DB_PASSWORD,
    database: envConfig().DB_NAME,
    entities: [
        "src/infrastructure/database/postgres/entities/*.{js,ts}", 
        "dist/infrastructure/database/postgres/entities/*.{js,ts}"
    ],
    migrations: ["dist/infrastructure/database/postgres/migrations/*.{js,ts}"],
    seeds: ["dist/infrastructure/database/postgres/seeds/*.{js,ts}"],

    synchronize: false, // nunca true em produção
    logging: false
} as DataSourceOptions & SeederOptions);

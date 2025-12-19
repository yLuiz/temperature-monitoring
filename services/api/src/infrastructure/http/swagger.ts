import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "node:path";

import * as dotenv from "dotenv";
dotenv.config({ override: false });

export function setupSwagger(app: Express) {

    const isRunningInDocker = process.env.IS_RUNNING_IN_DOCKER ? (process.env.IS_RUNNING_IN_DOCKER === "true") : true;

    const root = path.resolve(__dirname, "../../..");
    console.log("IS_RUNNING_IN_DOCKER:", isRunningInDocker);
    console.log("Root path for Swagger:", root);

    const apis = isRunningInDocker
        ? [
            path.join(root, "dist/presentation/routes/server/**/*.js"),
            path.join(root, "dist/presentation/swagger/**/*.js"),
        ]
        : [
            path.join(root, "src/presentation/routes/server/**/*.ts"),
            path.join(root, "src/presentation/swagger/**/*.ts"),
        ];

        console.log("Swagger API paths:", apis);

    const options: swaggerJsdoc.Options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Temperature Monitoring API",
                version: "1.0.0",
                description: "API para monitoramento de sensores, leituras e alertas"
            },
            servers: [
                {
                    url: "http://localhost:3000",
                    description: "Local"
                }
            ]
        },

        apis
    };

    const swaggerSpec = swaggerJsdoc(options);

    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

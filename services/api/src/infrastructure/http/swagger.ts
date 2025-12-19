import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "node:path";

export function setupSwagger(app: Express) {
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

        apis: [
            path.join(
                process.cwd(),
                "src/presentation/routes/server/**/*.ts"
            ),
            path.join(process.cwd(), "src/presentation/swagger/**/*.ts")
        ]
    };

    const swaggerSpec = swaggerJsdoc(options);

    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

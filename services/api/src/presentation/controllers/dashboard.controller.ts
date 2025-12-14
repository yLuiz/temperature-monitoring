import { Request, Response } from "express";
import { DatabaseInstance } from "../../infrastructure/database/in-memory/database.instance";
import { ISensorReading } from "../../infrastructure/database/in-memory/in-memory-database";

export class DashboardController {
    // dados fakes para testes
    private getReadings(): ISensorReading[] {

        const sensors = DatabaseInstance.db.sensors.getAll();

        let reandings: ISensorReading[] = [];

        for (const sensor of sensors) {
            DatabaseInstance.db.readings.getBySensorId(sensor.id).length > 0 &&
                reandings.push(
                    DatabaseInstance.db.readings.getBySensorId(sensor.id).slice(-1)[0]
                );
        }

        return reandings;
    }

    render(req: Request, res: Response) {
        const sensors = this.getReadings();

        const sensorsToTemplate = sensors.map(s => ({
            id: s.sensor.id,
            name: s.sensor.name,
            temperature: s.temperature,
            humidity: s.humidity
        }))

        // DustJS renderiza o template com dados iniciais (SSR)
        res.render("dashboard", {
            title: "Temperature Monitoring Dashboard",
            sensors: sensorsToTemplate,
            sensors_json: JSON.stringify(sensorsToTemplate)
        });
    }

    latest(req: Request, res: Response) {
        const sensors = this.getReadings();

        const sensorsToTemplate = sensors.map(s => ({
            id: s.sensor.id,
            name: s.sensor.name,
            temperature: s.temperature,
            humidity: s.humidity
        }))

        res.json([...sensorsToTemplate]);
    }
}

import { Request, Response } from "express";

type SensorViewModel = {
    id: string;
    name: string;
    temperature: number;
    humidity: number;
    updatedAt: string;
};

export class DashboardController {
    // dados fakes para testes
    private getFakeSensors(): SensorViewModel[] {
        return [
            {
                id: "sensor-1",
                name: "Sensor 1",
                temperature: 25,
                humidity: 60,
                updatedAt: new Date().toISOString()
            },
            {
                id: "sensor-2",
                name: "Sensor 2",
                temperature: 31,
                humidity: 55,
                updatedAt: new Date().toISOString()
            }
        ];
    }

    render(req: Request, res: Response) {
        const sensors = this.getFakeSensors();

        // DustJS renderiza o template com dados iniciais (SSR)
        res.render("dashboard", {
            title: "Temperature Monitoring Dashboard",
            sensors,
            sensors_json: JSON.stringify(sensors)
        });
    }

    latest(req: Request, res: Response) {
        // TinyBone faz polling aqui
        // (depois deve ser retornado a leitura mais recente do banco)
        const sensors = this.getFakeSensors().map(s => ({
            ...s,
            // para mostrar “mudanças” no dashboard
            temperature: Math.round((s.temperature + Math.random() * 5) * 10) / 10,
            humidity: Math.round((s.humidity + Math.random() * 5) * 10) / 10,
            updatedAt: new Date().toISOString()
        }));

        res.json(sensors);
    }
}

import { Request, Response } from "express";

export class SensorManagementPageController {

    render = async (req: Request, res: Response) => {

        // DustJS renderiza o template com dados iniciais (SSR)
        res.render("sensor-management", {
            title: "Temperature Monitoring Dashboard",
            sensors: [],
            totalSensors: 0,
            sensors_json: JSON.stringify([])
        });
    }
}
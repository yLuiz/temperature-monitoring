import { Request, Response } from "express";

export class SensorServerController {
    async getSensorData(req: Request, res: Response) {
        res.json({ data: "Sensor data" });
    }
}

import { Request, Response } from "express";
import { SensorReadingMapper } from "../../../application/mappers/sensor-reading.mapper";
import { GetLatestReadingsUseCase } from "../../../application/use-cases/sensor-readings/get-latest-readings.use-case";

export class AboutPageController {

    private readonly _getLatestReadingsUseCase: GetLatestReadingsUseCase;

    constructor() {
        this._getLatestReadingsUseCase = new GetLatestReadingsUseCase();
    }

    render = async (req: Request, res: Response) => {
        const sensors = await this._getLatestReadingsUseCase.execute();

        const sensorsToTemplate = sensors.map(SensorReadingMapper.toTemplate);

        // DustJS renderiza o template com dados iniciais (SSR)
        res.render("about", {
            title: "Temperature Monitoring Dashboard",
            sensors: sensorsToTemplate,
            sensors_json: JSON.stringify(sensorsToTemplate)
        });
    }
}

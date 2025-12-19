import { Request, Response } from "express";
import { SensorReadingMapper } from "../../../application/mappers/sensor-reading.mapper";
import { GetLatestReadingsUseCase } from "../../../application/use-cases/sensor-readings/get-latest-readings.use-case";
import { SensorReadingToTemplateInterface } from "../../../application/interfaces/sensor-reading/sensor-reading-to-template.interface";

export class SensorReadingsServerController {

    private readonly _getLatestReadingsUseCase: GetLatestReadingsUseCase;

    constructor() {
        this._getLatestReadingsUseCase = new GetLatestReadingsUseCase();
    }

    async latest(req: Request, res: Response): Promise<Response<SensorReadingToTemplateInterface[]>> {
        const sensors = await this._getLatestReadingsUseCase.execute();
        const sensorsToTemplate = sensors.map(SensorReadingMapper.toTemplate);

        return res.json([...sensorsToTemplate]);
    }
}
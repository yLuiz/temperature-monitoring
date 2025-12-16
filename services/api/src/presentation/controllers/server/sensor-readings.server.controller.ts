import { Request, Response } from "express";
import { SensorReadingMapper } from "../../../application/mappers/sensor-reading.mapper";
import { GetLatestReadingsUseCase } from "../../../application/use-cases/sensor-readings/get-latest-readings.use-case";

export class SensorReadingsServerController {

    private readonly _getLatestReadingsUseCase: GetLatestReadingsUseCase;

    constructor() {
        this._getLatestReadingsUseCase = new GetLatestReadingsUseCase();
    }

    async latest(req: Request, res: Response) {
        const sensors = await this._getLatestReadingsUseCase.execute();
        const sensorsToTemplate = sensors.map(SensorReadingMapper.toTemplate);

        res.json([...sensorsToTemplate]);
    }
}

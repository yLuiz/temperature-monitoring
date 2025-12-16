import { Request, Response } from "express";
import { SensorReadingMapper } from "../../../application/mappers/sensor-reading.mapper";
import { GetLatestReadingsUseCase } from "../../../application/use-cases/sensor-readings/get-latest-readings.use-case";
import { logger } from "../../../infrastructure/logger/logger";
import { BadRequestException } from "../../../infrastructure/http/exceptions/BadRequestException";
import { HttpException } from "../../../infrastructure/http/exceptions/HttpException";
import { NotFoundException } from "../../../infrastructure/http/exceptions/NotFoundException";
import { InternalServerErrorException } from "../../../infrastructure/http/exceptions/InternalServerErrorException";

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

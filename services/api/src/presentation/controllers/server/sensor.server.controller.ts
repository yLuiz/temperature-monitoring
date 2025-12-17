import { Request, Response } from "express";
import { RegisterSensorUseCase } from "../../../application/use-cases/sensors/register-sensor.use-case";
import { UpdateSensorUseCase } from "../../../application/use-cases/sensors/update-sensor.use-case";
import { DeleteSensorUseCase } from "../../../application/use-cases/sensors/delete-sensor.use-case";
import { GetSensorByIdUseCase } from "../../../application/use-cases/sensors/get-sensor-by-id.use-case";
import { GetSensorByCodeUseCase } from "../../../application/use-cases/sensors/get-sensor-by-code.use-case";
import { GetAllSensorsUseCase } from "../../../application/use-cases/sensors/get-all-sensors.use-case";

export class SensorServerController {

    private readonly _registerSensorUseCase: RegisterSensorUseCase;
    private readonly _updateSensorUseCase: UpdateSensorUseCase;
    private readonly _deleteSensorUseCase: DeleteSensorUseCase;
    private readonly _getSensorByCodeUseCase: GetSensorByCodeUseCase;
    private readonly _getSensorByIdUseCase: GetSensorByIdUseCase;
    private readonly _getAllSensorsUseCase: GetAllSensorsUseCase;


    constructor() {
        this._registerSensorUseCase = new RegisterSensorUseCase();
        this._updateSensorUseCase = new UpdateSensorUseCase();
        this._deleteSensorUseCase = new DeleteSensorUseCase();
        this._getSensorByIdUseCase = new GetSensorByIdUseCase();
        this._getSensorByCodeUseCase = new GetSensorByCodeUseCase();
        this._getAllSensorsUseCase = new GetAllSensorsUseCase();
    }

    async create() {

    }

    async update() {

    }

    async delete() {

    }

    async getById(req: Request, res: Response) {
        res.json({ data: "Sensor data" });
    }
}

import { Request, Response } from "express";
import { CreateSensorInterface } from "../../../application/interfaces/sensor/create-sensor.interface";
import { UpdateSensorInterface } from "../../../application/interfaces/sensor/update-sensor.interface";
import { DeleteSensorUseCase } from "../../../application/use-cases/sensors/delete-sensor.use-case";
import { GetAllSensorsUseCase } from "../../../application/use-cases/sensors/get-all-sensors.use-case";
import { GetSensorByCodeUseCase } from "../../../application/use-cases/sensors/get-sensor-by-code.use-case";
import { GetSensorByIdUseCase } from "../../../application/use-cases/sensors/get-sensor-by-id.use-case";
import { RegisterSensorUseCase } from "../../../application/use-cases/sensors/register-sensor.use-case";
import { UpdateSensorUseCase } from "../../../application/use-cases/sensors/update-sensor.use-case";

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

    async create(req: Request, res: Response) {
        const body: CreateSensorInterface = req.body;

        if (!body) {
            res.status(400).json({ message: "Invalid request body" });
            return;
        }

        const requiredFields = ['name', 'sensor_code', 'min_temperature', 'max_temperature', 'min_humidity', 'max_humidity'];
        for (const field of requiredFields) {
            if (body[field as keyof CreateSensorInterface] === undefined || body[field as keyof CreateSensorInterface] === null) {
                res.status(400).json({ message: `Missing required field: ${field}` });
                return;
            }
        }

        if (typeof body.name !== 'string' || body.name.trim() === '') {
            res.status(400).json({ message: "Invalid value for field: name" });
            return;
        }

        if (typeof body.sensor_code !== 'string' || body.sensor_code.trim() === '') {
            res.status(400).json({ message: "Invalid value for field: sensor_code" });
            return;
        }

        const result = await this._registerSensorUseCase.execute(body);
        return res.json(result);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const body: UpdateSensorInterface = req.body;
        const result = await this._updateSensorUseCase.execute(id, body);
        return res.json(result);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this._deleteSensorUseCase.execute(id);
        return res.status(204).send();
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const sensor = await this._getSensorByIdUseCase.execute(id);
        return res.json(sensor);
    }

    async getByCode(req: Request, res: Response) {
        const { code } = req.params;
        const sensor = await this._getSensorByCodeUseCase.execute(code);
        return res.json(sensor);
    }

    async getAll(req: Request, res: Response) {

        const sensors = await this._getAllSensorsUseCase.execute();

        return res.json(sensors);
    }
}

import { AlertRepositoryInstance, AlertRepositoryType } from "../../../infrastructure/database/postgres/repositories/alert.repository";
import { SensorRepositoryInstance, SensorRepositoryType } from "../../../infrastructure/database/postgres/repositories/sensor.repository";
import { MetricParameterEnum, SensorAlertInterface } from "../../interfaces/alert/sensor-alert.interface";

export class RegisterAlertUseCase {

    private readonly _sensorRepository: SensorRepositoryType;
    private readonly _alertRepository: AlertRepositoryType;
    constructor() {
        this._sensorRepository = SensorRepositoryInstance;
        this._alertRepository = AlertRepositoryInstance;
    }

    async execute(alertData: SensorAlertInterface): Promise<void> {
        const { sensor_code, metric, occurred_at, message } = alertData;

        const sensorExists = await this._sensorRepository.getBySensorCode(sensor_code);

        if (!sensorExists) {
            throw new Error(`Sensor with code ${sensor_code} does not exist.`);
        }

        /**
         * diff: magnitude absoluta da violação
         * Sempre >= 0
         * Exemplo:
         *   - Se o parâmetro for MIN, diff = |limite - valor|
         *   - Se o parâmetro for MAX, diff = |valor - limite|
         * Assim, diff indica o quão longe o valor medido está do limite definido
         */
        let diff: number;

        switch (metric.parameter) {
            case MetricParameterEnum.MIN:
                diff = Math.abs(metric.limit - metric.value);
                break;

            case MetricParameterEnum.MAX:
                diff = Math.abs(metric.value - metric.limit);
                break;

            default:
                throw new Error(`Invalid metric parameter: ${metric.parameter}`);
        }

        await this._alertRepository.create({
            sensor_id: sensorExists.id,
            occurred_at: new Date(occurred_at),
            message,
            type: metric.type,
            value: metric.value,
            limit: metric.limit,
            parameter: metric.parameter,
            diff
        });

    }
}
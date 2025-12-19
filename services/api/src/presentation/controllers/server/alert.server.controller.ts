import { Request, Response } from "express";
import { PaginationResponseInterface } from "../../../application/interfaces/http/pagination-response.interface";
import { GetAlertByIdUseCase } from "../../../application/use-cases/alerts/get-alert-by-id.use-case";
import { GetAllAlertsUseCase } from "../../../application/use-cases/alerts/get-all-alerts.use-case";
import { Alert } from "../../../infrastructure/database/postgres/entities/Alert";
import { parseFilterAlertsArgs } from "../../../infrastructure/http/helpers/parse-filter-alerts-args.helper";
import { validateFilterAlertsArgs } from "../../../infrastructure/http/helpers/validate-filter-alerts-args.helper";


export class AlertServerController {

    private readonly _getAlertByIdUseCase: GetAlertByIdUseCase;
    private readonly _getAllAlertsUseCase: GetAllAlertsUseCase;

    constructor() {
        this._getAlertByIdUseCase = new GetAlertByIdUseCase();
        this._getAllAlertsUseCase = new GetAllAlertsUseCase();
    }

    async getAlerts(req: Request, res: Response): Promise<Response<PaginationResponseInterface<Alert>>> {

        const filterArgs = parseFilterAlertsArgs(req);

        validateFilterAlertsArgs(filterArgs);

        const alerts = await this._getAllAlertsUseCase.execute(filterArgs);

        return res.json(alerts);
    }

    async getAlertById(req: Request, res: Response): Promise<Response<Alert>> {
        const { id } = req.params;
        const alert = await this._getAlertByIdUseCase.execute(id);
        return res.json(alert);
    }
}
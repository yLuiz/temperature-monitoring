import { Alert } from "../../../infrastructure/database/postgres/entities/Alert";
import { AlertRepositoryInstance, AlertRepositoryType, FilterAlertsArgs } from "../../../infrastructure/database/postgres/repositories/alert.repository";
import { PaginationResponseInterface } from "../../interfaces/http/pagination-response.interface";

export class GetAllAlertsUseCase {

    private readonly _alertRepository: AlertRepositoryType
    constructor() {
        this._alertRepository = AlertRepositoryInstance;
    }

    async execute(args: FilterAlertsArgs): Promise<PaginationResponseInterface<Alert>> {
        const alerts = await this._alertRepository.getAll(args);
        const totalItems = await this._alertRepository.count(args);

        const page = args.page ?? 1;
        const limit = args.limit ?? 10;
        const take = alerts.length;

        const paginationResponse: PaginationResponseInterface<Alert> = {
            data: alerts,
            take,
            limit,
            totalItems,
            currentPage: page
        };

        return paginationResponse;
    }
}
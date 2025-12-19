import { Alert } from "../../../infrastructure/database/postgres/entities/Alert";
import { AlertRepositoryInstance, AlertRepositoryType } from "../../../infrastructure/database/postgres/repositories/alert.repository";
import { NotFoundException } from "../../../infrastructure/http/exceptions/NotFoundException";

export class GetAlertByIdUseCase {
    
    private readonly _alertRepository: AlertRepositoryType;
    constructor() {
        this._alertRepository = AlertRepositoryInstance;
    }

    async execute(id: string): Promise<Alert> {
        const alert = await this._alertRepository.getById(id);
        if (!alert) {
            throw new NotFoundException(`Alert with ID ${id} not found.`);
        }

        return alert;
    }
}
import { FilterAlertsArgs } from "../../database/postgres/repositories/alert.repository";
import { BadRequestException } from "../exceptions/BadRequestException";

function validateFilterAlertsArgs(args: FilterAlertsArgs): void {
    const { page, limit, startDate, endDate } = args;

    if (limit !== undefined && (limit < 1 || limit > 100)) {
        throw new BadRequestException("Limit must be between 1 and 100.");
    }

    if (page !== undefined && page < 1) {
        throw new BadRequestException("Page must be greater than 0.");
    }

    if (startDate && isNaN(startDate.getTime())) {
        throw new BadRequestException("Invalid startDate format.");
    }

    if (endDate && isNaN(endDate.getTime())) {
        throw new BadRequestException("Invalid endDate format.");
    }

    if (startDate && endDate && startDate > endDate) {
        throw new BadRequestException("startDate must be before endDate.");
    }
}

export { validateFilterAlertsArgs };
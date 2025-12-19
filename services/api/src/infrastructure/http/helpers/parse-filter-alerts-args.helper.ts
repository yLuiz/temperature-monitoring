import { Request } from "express";
import { FilterAlertsArgs } from "../../database/postgres/repositories/alert.repository";


function parseFilterAlertsArgs(req: Request): FilterAlertsArgs {
    return {
        sensor_id: req.query.sensor_id as string | undefined,
        type: req.query.type as string | undefined,
        startDate: req.query.startDate
            ? new Date(req.query.startDate as string)
            : undefined,
        endDate: req.query.endDate
            ? new Date(req.query.endDate as string)
            : undefined,
        page: req.query.page
            ? Number(req.query.page)
            : undefined,
        limit: req.query.limit
            ? Number(req.query.limit)
            : undefined
    };
}

export { parseFilterAlertsArgs };
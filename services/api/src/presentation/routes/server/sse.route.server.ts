import { Router } from "express";
import { SseServerController } from "../../controllers/server/sse.server.controller";

const sseRoutes = Router();

const sseServerController = new SseServerController();

export function broadcast(data: any) {
    sseServerController.broadcast(data);
}

sseRoutes.get("/events", (req, res) => sseServerController.handler(req, res));

export { sseRoutes };

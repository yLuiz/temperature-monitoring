import { Router } from "express";
import { AlertServerController } from "../../controllers/server/alert.server.controller";

const alertServerRoutes = Router();

const alertServerController = new AlertServerController();

alertServerRoutes.get("/", (req, res) => alertServerController.getAlerts(req, res));
alertServerRoutes.get("/:id", (req, res) => alertServerController.getAlertById(req, res));

export { alertServerRoutes };
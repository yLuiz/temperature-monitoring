import express from "express";
import path from "path";

// Importa o DustJS “registrando” o engine no require cache
// (o package expõe o motor e o compilador)

import { setupDustEngine } from "./infrastructure/view-engines/dust.engine";
import { dashboardRoutes } from "./presentation/routes/dashboard.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupDustEngine(app);

// ✅ Views: como em runtime você roda dist/, a pasta vira dist/views
app.set("views", path.join(__dirname, "views"));

// ✅ View engine: “dust”
app.set("view engine", "dust");

// ✅ Arquivos estáticos: em runtime vira dist/public
app.use("/public", express.static(path.join(__dirname, "public")));

// Rotas
app.use("/", dashboardRoutes);

export default app;

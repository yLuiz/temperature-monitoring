import express from "express";
import path from "path";
import { setupDustEngine } from "./infrastructure/view-engines/dust.engine";
import { indexRoutes } from "./presentation/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupDustEngine(app);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "dust");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", indexRoutes);

export default app;
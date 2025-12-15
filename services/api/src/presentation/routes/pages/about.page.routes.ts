import { Router } from "express";
import { AboutPageController } from "../../controllers/pages/about.page.controller";


export const aboutPageRoutes = Router();
const controller = new AboutPageController();

// Renderiza o HTML com Dust
aboutPageRoutes.get("/", (req, res) => controller.render(req, res));

// Redireciona qualquer rota /about/* para /about   
aboutPageRoutes.get("/*path", (req, res) => {
    res.redirect("/about");
});
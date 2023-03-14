import express from "express";
import homeController from "../controllers/homeController"

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)

    router.get('/testPage', homeController.getTestPage)

    return app.use("/", router);
}

export default initWebRoutes
import express from "express";
import homeController from "../controllers/homeController"

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)

    router.get('/testPage', homeController.getTestPage)

    router.get('/crud', homeController.getCRUDPage)

    router.post('/createUser', homeController.createUser)

    router.get('/displayUser', homeController.getDisPlayUser)

    router.get('/getUserUpdate', homeController.getUserUpdate)

    router.post('/updateUser', homeController.updateUser)

    router.get('/deleteUser', homeController.deleteUserById)

    return app.use("/", router);
}

export default initWebRoutes
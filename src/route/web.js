import express from "express";
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"

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

    router.post('/api/login', userController.handleLogin)

    router.get('/api/get-all-user', userController.handleGetAllUser)

    router.post('/api/create-new-user', userController.handleCreateNewUser)

    router.post('/api/update-user', userController.handleUpdateUser)

    router.get('/api/delete-user', userController.handleDeleteUser)
    return app.use("/", router);
}

export default initWebRoutes
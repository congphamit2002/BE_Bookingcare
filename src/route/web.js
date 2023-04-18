import express from "express";
import homeController from "../controllers/homeController"
import doctorController from '../controllers/doctorController'
import userController from "../controllers/userController"
import patientController from '../controllers/patientController'
import specialtyController from "../controllers/specialtyController";

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

    router.get('/api/getAllCode', userController.getAllCode)

    router.get('/api/getTopDoctor', doctorController.handleGetTopDocTor)

    router.get('/api/getAllDoctor', doctorController.handleGetAllDoctor)

    router.post('/api/saveInforDoctor', doctorController.handleSaveInforDoctor)

    router.get('/api/get-doctor-infor', doctorController.handleGetDoctorInfoById)

    router.post('/api/create-schedule', doctorController.handleCreateSchedule)

    router.get('/api/get-available-schedule', doctorController.handleGetAvailableSchedule)

    router.get('/api/get-doctor-profile-by-id', doctorController.handleGetDoctorProfileById)

    router.post('/api/createAnAppointment', patientController.handleCreateAnAppointment)
    router.post('/api/verify-book-appointment', patientController.handleConfirmAnAppointment)

    router.post('/api/createASpecialty', specialtyController.handleCreateSpecialty)
    router.get('/api/get-all-specialties', specialtyController.handleGetAllSpecialties)

    return app.use("/", router);
}

export default initWebRoutes
import PatientService from "../services/PatientService"

let handleCreateAnAppointment = async (req, res) => {
    try {
        let message = await PatientService.handleCreateAnAppointment(req.body);
        return res.status(200).json(message);
    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleConfirmAnAppointment = async (req, res) => {
    try {
        let message = await PatientService.handleConfirmAnAppointment(req.body);
        return res.status(200).json(message);
    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

export default {
    handleCreateAnAppointment: handleCreateAnAppointment,
    handleConfirmAnAppointment: handleConfirmAnAppointment
}
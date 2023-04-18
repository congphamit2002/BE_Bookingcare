import doctorService from '../services/doctorService'

let handleGetTopDocTor = async (req, res) => {
    try {
        let numberGet = req.query.numberGet
        if (numberGet) {
            numberGet = 10
        }
        let message = await doctorService.handleGetTopDocTor(numberGet);
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetAllDoctor = async (req, res) => {
    try {
        let message = await doctorService.handleGetAllDoctor();
        return res.status(200).json(message)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleSaveInforDoctor = async (req, res) => {
    try {
        console.log('into controller')
        let message = await doctorService.handleSaveInforDoctor(req.body);
        return res.status(200).json(message)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetDoctorInfoById = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing parameter'
            })
        }

        let message = await doctorService.handleGetDoctorInfoById(req.query.id);
        return res.status(200).json(message)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }

}

let handleCreateSchedule = async (req, res) => {

    try {
        console.log('================Data from req ', req.body)

        if (!req.body.data || req.body.data.length === 0 || !req.body.doctorId || !req.body.date) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing parameter'
            })
        }
        let message = await doctorService.handleCreateSchedule(req.body.data, req.body.doctorId, req.body.date);
        return res.status(200).json(message)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }

}

let handleGetAvailableSchedule = async (req, res) => {
    try {
        let doctorId = req.query.doctorId;
        let date = req.query.date;

        if (!doctorId || !date) {
            res.status(200).json({
                errCode: 1,
                message: 'Missing parameter'
            })
        }

        let message = await doctorService.handleGetAvailableSchedule(doctorId, date);
        return res.status(200).json(message);
    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetDoctorProfileById = async (req, res) => {
    try {
        let doctorId = req.query.doctorId;

        if (!doctorId) {
            res.status(200).json({
                errCode: 1,
                message: 'Missing parameter'
            })
        }

        let message = await doctorService.handleGetDoctorProfileById(doctorId);
        return res.status(200).json(message);
    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

export default {
    handleGetTopDocTor: handleGetTopDocTor,
    handleGetAllDoctor: handleGetAllDoctor,
    handleSaveInforDoctor: handleSaveInforDoctor,
    handleGetDoctorInfoById: handleGetDoctorInfoById,
    handleCreateSchedule: handleCreateSchedule,
    handleGetAvailableSchedule: handleGetAvailableSchedule,
    handleGetDoctorProfileById: handleGetDoctorProfileById
}
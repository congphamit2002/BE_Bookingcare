import SpecialtyService from "../services/SpecialtyService";

let handleCreateSpecialty = async (req, res) => {
    try {
        let message = await SpecialtyService.handleCreateSpecialty(req.body);
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetAllSpecialties = async (req, res) => {
    try {
        let message = await SpecialtyService.handleGetAllSpecialties();
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

export default {
    handleCreateSpecialty: handleCreateSpecialty,
    handleGetAllSpecialties: handleGetAllSpecialties
}
import userService from '../services/UserService'

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        res.status(500).json({
            errCode: 1,
            message: 'Please enter enough input'
        })
    }

    console.log('email: ', email, " password: ", password)
    let userData = await userService.checkLogin(email, password);
    res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}


let handleGetAllUser = async (req, res) => {
    let userId = req.query.id;

    if (!userId) {
        res.status(500).json({
            errCode: 1,
            message: 'Missing parameter, pleas enter ID'
        })
    }

    let user = await userService.handleGetAllUser(userId)

    res.status(200).json({
        errCode: 0,
        message: 'Success',
        userData: user
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.handleCreateNewUser(req.body);
    res.status(200).json(message)

}

let handleUpdateUser = async (req, res) => {
    let message = await userService.handleUpdateUser(req.body);
    res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    let message = await userService.handleDeleteUser(req.query.id);
    res.status(200).json(message);
}

let getAllCode = async (req, res) => {
    let message = await userService.handleGetAllCode(req.query.type);
    res.status(200).json(message);
}

export default {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleUpdateUser: handleUpdateUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode
}
import db from '../models/index';
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data)
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}

let getTestPage = (req, res) => {
    return res.render('testPage.ejs');
}

let getCRUDPage = (req, res) => {
    return res.render('CRUDPage.ejs');
}

let createUser = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('work post');
}

let getDisPlayUser = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log(data);
    return res.render('displayUser.ejs', { data: data });
}

let getUserUpdate = async (req, res) => {
    let userUpdate = await CRUDService.findUserUpdateById(req.query.id);
    if (userUpdate != {}) {
        console.log(userUpdate);
        return res.render('updateUser.ejs', { user: userUpdate });
    } else {
        console.log(userUpdate);
        return res.send('User not found');
    }
}

let updateUser = async (req, res) => {
    let allUser = await CRUDService.updateUser(req.body);
    if (allUser) {
        return res.render('displayUser.ejs', { data: allUser });

    }
}

let deleteUserById = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let allUser = await CRUDService.deleteUserById(id)
        if (allUser) {
            return res.render('displayUser.ejs', { data: allUser });

        }
    }
    return res.send('User not found');
}

export default {
    getHomePage: getHomePage
    , getTestPage: getTestPage
    , getCRUDPage: getCRUDPage
    , createUser: createUser
    , getDisPlayUser: getDisPlayUser
    , getUserUpdate: getUserUpdate
    , updateUser: updateUser
    , deleteUserById: deleteUserById
}
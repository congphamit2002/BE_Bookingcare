import bcrypt from 'bcrypt';
import db from '../models/index'
import { up } from '../seeders/seeders-user';
const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPass = await hashPassword(data.password);
            await db.users.create({
                email: data.email,
                password: hashPass,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === 1 ? true : false,
                roleId: data.roleId,
                phonenumber: data.phone
            })
            resolve('INSERT SUCCESSFULLY');
        } catch (error) {
            reject(error)
        }
    })
}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt)
            resolve(hash);
        } catch (error) {
            return reject(error);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.users.findAll({ raw: true });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

let findUserUpdateById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: {
                    id: userId
                },
                raw: true
            })
            if (user) {
                resolve(user);
            } else {
                resolve({})
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: {
                    id: data.id
                }
            })

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUsers = await db.users.findAll({ raw: true });
                resolve(allUsers);
            } else {
                resolve({});
            }
            resolve()
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy()
                let allUsers = await db.users.findAll({ raw: true });
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    })
}

export default {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    findUserUpdateById: findUserUpdateById,
    updateUser: updateUser,
    deleteUserById: deleteUserById
}
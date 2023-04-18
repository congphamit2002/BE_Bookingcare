import { reject } from 'bcrypt/promises';
import db from '../models/index'
import EmailService from './EmailService'
import { v4 as uuidv4 } from 'uuid';
// require('dotenv').config()

let handleCreateAnAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Data request ', data)
            if (!data.doctorId || !data.email || !data.date || !data.timeType
                || !data.fullName || !data.phonenumber || !data.language
                || !data.doctorName
            ) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter'
                })
            } else {
                let token = uuidv4();
                await EmailService.sendEmail({
                    token: token,
                    doctorId: data.doctorId,
                    fullName: data.fullName,
                    timeBook: data.timeBook,
                    phonenumber: data.phonenumber,
                    language: data.language,
                    doctorName: data.doctorName,
                    email: data.email

                })
                //upsert patient
                let users = await db.users.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.gender,
                        address: data.address,
                        phonenumber: data.phonenumber,
                        firstName: data.fullName
                    }
                });

                //create booking
                if (users && users[0]) {
                    await db.bookings.findOrCreate({
                        where: { patientId: users[0].id, doctorId: data.doctorId },
                        defaults: {
                            statusId: 'S1',
                            doctorId: +data.doctorId,
                            patientId: users[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }

                resolve({
                    errCode: 0,
                    message: 'Save booking success'
                })
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })

}

let handleConfirmAnAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {

                resolve({
                    errCode: 1,
                    message: 'Missing Parameter'
                })
            } else {


                let appointment = await db.bookings.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1',
                    }
                })

                if (appointment) {

                    appointment.statusId = 'S2';
                    appointment.save();
                    resolve({
                        errCode: 0,
                        message: "Confirm appointment success"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: "An appointment is confirmed or not exist"
                    })
                }
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

export default {
    handleCreateAnAppointment: handleCreateAnAppointment,
    handleConfirmAnAppointment: handleConfirmAnAppointment
}
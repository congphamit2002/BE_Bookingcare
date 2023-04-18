import { reject } from 'bcrypt/promises'
import db from '../models/index'

let handleGetTopDocTor = (numberGet) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.users.findAll({
                where: { roleId: 'R2' },
                attributes: { exclude: ['password'] },
                limit: numberGet,
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.allcodes, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })
}

let handleGetAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.users.findAll(
                {
                    where: { roleId: 'R2' },
                    attributes: { exclude: ['password', 'image'] },
                }
            );

            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error);
        }
    })
}

let handleSaveInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('into service and data ', data)
            if (!data.doctorId || !data.contentHTML ||
                !data.contentMarkdown || !data.actions ||
                !data.description || !data.clinicName ||
                !data.clinicAddress || !data.priceId ||
                !data.provinceId || !data.paymentId) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter'
                })
            }

            if (data.actions === 'CREATE') {
                await db.markdowns.create({
                    doctorId: data.doctorId,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    description: data.description
                })
            }

            if (data.actions === 'UPDATE') {
                let doctor = await db.markdowns.findOne({
                    where: { doctorId: data.doctorId },
                    raw: false
                })

                doctor.contentHTML = data.contentHTML;
                doctor.contentMarkdown = data.contentMarkdown;
                doctor.description = data.description;

                await doctor.save();
            }

            let doctorInfor = await db.doctor_infors.findOne({
                where: { doctorId: data.doctorId },
                raw: false
            })

            if (doctorInfor) {
                doctorInfor.clinicName = data.clinicName;
                doctorInfor.clinicAddress = data.clinicAddress;
                doctorInfor.note = data.note;
                doctorInfor.priceId = data.priceId;
                doctorInfor.provinceId = data.provinceId;
                doctorInfor.paymentId = data.paymentId;
                await doctorInfor.save();
                resolve({
                    errCode: 0,
                    message: 'Update doctor infor successfuly'
                })
            } else {
                await db.doctor_infors.create({
                    doctorId: data.doctorId,
                    clinicName: data.clinicName,
                    clinicAddress: data.clinicAddress,
                    note: data.note,
                    priceId: data.priceId,
                    provinceId: data.provinceId,
                    paymentId: data.paymentId,
                })
                resolve({
                    errCode: 0,
                    message: 'Create doctor infor successfuly'
                })
            }

        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

let handleGetDoctorInfoById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.users.findOne({
                where: { id: id },
                attributes: { exclude: ['password'] },
                include: [
                    { model: db.markdowns, attributes: ['contentHTML', 'contentMarkdown', 'description'] },
                    { model: db.allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    {
                        model: db.doctor_infors,
                        exclude: ['id', 'doctorId'],
                        include: [
                            { model: db.allcodes, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.allcodes, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.allcodes, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },

                        ]
                    },
                ],
                raw: true,
                nest: true
            })
            if (doctor) {
                if (doctor.image) {
                    doctor.image = new Buffer(doctor.image, 'base64').toString('binary');
                }
                resolve({
                    errCode: 0,
                    data: doctor
                })
            } else {
                resolve({
                    errCode: 0,
                    data: {}
                })
            }
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

let handleCreateSchedule = (data, doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {

            let scheduleDtb = await db.schedule.findAll({
                where: {
                    doctorId: doctorId,
                    date: date
                },
                attributes: ['maxNumber', 'date', 'timeType', 'doctorId'],
                raw: true
            })
            console.log('=========Schedule dtb ', scheduleDtb)


            if (scheduleDtb && scheduleDtb.length > 0) {
                scheduleDtb.map((item) => {
                    item.date = new Date(item.date).getTime();
                    return item;
                })
            }

            const difference = data.filter(object1 => {
                return !scheduleDtb.some(object2 => {
                    return object1.timeType === object2.timeType && object1.date === object2.date;
                });
            });

            console.log('=========Schedule dtb ', scheduleDtb)
            console.log('=========Difference ', difference)

            if (difference && difference.length > 0) {
                await db.schedule.bulkCreate(
                    difference
                )
            }


            resolve({
                errCode: 0,
                message: 'Create schedule successfully'
            })
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

let handleGetAvailableSchedule = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('check doctor id from req ', doctorId)
            console.log('check date from req ', date)

            let day = new Date(+date)

            let availableSchedule = await db.schedule.findAll({
                where: {
                    doctorId: doctorId,
                    date: day
                },
                attributes: ['maxNumber', 'date', 'timeType', 'doctorId'],
                include: [
                    { model: db.allcodes, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.users, as: 'doctorData', attributes: ['firstName', 'lastName'] },

                ],
                raw: true,
                nest: true
            })

            if (availableSchedule && availableSchedule.length > 0) {
                resolve({
                    errCode: 0,
                    data: availableSchedule
                })
            } else {
                resolve({
                    errCode: 0,
                    data: []
                })
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

let handleGetDoctorProfileById = (doctorId) => {
    return new Promise(async (resolve, reject) => {

        try {
            let doctor = await db.users.findOne({
                where: { id: doctorId },
                attributes: { exclude: ['password'] },
                include: [
                    { model: db.markdowns, attributes: ['description'] },
                    { model: db.allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    {
                        model: db.doctor_infors,
                        exclude: ['id', 'doctorId'],
                        include: [
                            { model: db.allcodes, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.allcodes, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.allcodes, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },

                        ]
                    },
                ],
                raw: true,
                nest: true
            })
            if (doctor) {
                if (doctor.image) {
                    doctor.image = new Buffer(doctor.image, 'base64').toString('binary');
                }
                resolve({
                    errCode: 0,
                    data: doctor
                })
            } else {
                resolve({
                    errCode: 0,
                    data: {}
                })
            }
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
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
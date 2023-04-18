import nodemailer from 'nodemailer'
require('dotenv').config()

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'thanhcongpham22072002@gmail.com', // generated ethereal user
        pass: process.env.APP_PASS, // generated ethereal password
    },
});

// send mail with defined transport object
let sendEmail = async (data) => {
    await transporter.sendMail({
        from: '"Bookingcare 👻" <foo@example.com>', // sender address
        subject: "Đặt lịch khám bệnh ✔", // Subject line
        text: "Xác nhận lịch khám bệnh",
        to: data.email, // list of receivers
        html: emailTemplate(data), // html body
    });
}

let generateVerifyLink = (token, doctorId) => {
    return `http://localhost:3000/verify-booking?token=${token}&doctorId=${doctorId}`
}

let emailTemplate = (data) => {
    let verifyLink = generateVerifyLink(data.token, data.doctorId)

    if (data.language === 'VI') {
        return `
        <h2>Cảm ơn bạn đã đặt lịch khám trên Booking care</h2>
        <div>
        <h3>Vui lòng xác nhận thông tin đặt lịch của bạn</h3>
        </div>
        <div>
        <span>Tên người đặt: </span><b>${data.fullName}</b>
        </div>
        <div>
        <span>Số điện thoại của bạn: </span><b>${data.phonenumber}</b>
        </div>
        <div>
        <span>Tên bác sĩ: </span><b>${data.doctorName}</b>
        </div>
        <div>
        <span>Thời gian khám: </span><b>${data.timeBook}</b>
        </div>
        <div>
        <span>Click vào đây để xác nhận đặt lịch: <a href=${verifyLink} target="_blank">Click here</a></span>
        </div>
        `
    }

    return `
    <h2>Thank you for booking an appointment on Booking care</h2>
    <div>
    <h3>Please confirm your booking information</h3>
    </div>
    <div>
    <span>Placer's name: </span><b>${data.fullName}</b>
    </div>
    <div>
    <span>Your phone number: </span><b>${data.phonenumber}</b>
    </div>
    <div>
    <span>Doctor name: </span><b>${data.doctorName}</b>
    </div>
    <div>
    <span>Time booking: </span><b>${data.timeBook}</b>
    </div>
    <div>
    <span>Click here to confirm your booking: <a href=${verifyLink} target="_blank">Click here</a></span>
    </div>
    `

}


export default {
    sendEmail: sendEmail
}
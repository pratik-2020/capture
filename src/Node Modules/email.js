const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ayushsingh10122001@gmail.com',
        pass: 'Pratik@123'
    }
});



function sendEmail(email) {
    var mailOptions = {
        from: 'ayushsingh10122001@gmail.com',
        to: email,
        subject: 'Your One Time Password (OTP) is ',
        text: '123456'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
        }
        else{
            console.log('Email sent : '+info.response);
        }
    });
}

module.exports = sendEmail;
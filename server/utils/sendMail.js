const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async({email, html}) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_NAME,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });
      
      let info = await transporter.sendMail({
        from: '"Bee Angle" <no-reply@beeangle.com>',
        to: email,
        subject: 'Password Reset',
        html: html,
    });

    return info;
})

module.exports = sendMail

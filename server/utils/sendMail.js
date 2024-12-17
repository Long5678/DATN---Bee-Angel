const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async ({
  email,
  html,
  attachments
}) => {
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
    from: '"Bee Angel" <no-reply@beeangle.com>',
    to: email,
    subject: 'Thông báo từ Bee Angel',
    html: html,
    attachments: attachments, // Đảm bảo attachments được truyền vào
  });

  console.log("Mail sent:", info);
  return info;
});


module.exports = sendMail
"use strict";
require('dotenv').config()
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER, // generated ethereal user
      pass: process.env.GMAIL_APP_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Harbor Trip" <harbortripconfirmation@gmail.com>', // sender address
    to: "wbmxxpiyglljajbhwn@tmmwj.com", // list of receivers
    subject: "Bienvenido a Harbor Trip ", // Subject line
    text: "Hello world?", // plain text body
    html: "<b><h2>Gracias por registrarte en Harbor Trip!</h2> <br> Por favor segui en link a continuacion para confrimar tu registro. <br> ¡Te esperamos!</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
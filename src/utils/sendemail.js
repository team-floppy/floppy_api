"use strict";
const nodemailer = require("nodemailer");

exports.sendMail = userDetails => {
  return new Promise((resolve, reject) => {
    let transport = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: "s.mustapha@zohomail.com",
        pass: "v81vaJu1TmbV"
      }
    });

    transport.sendMail(
      {
        from: "s.mustapha@zohomail.com",
        to: userDetails.email,
        subject: `Welcome  ${userDetails.name} please verify your account`,
        text: `Your Floppy verification code is: ${userDetails.verificationCode}`,
        html: `<html><body>Your Floppy verification code is: ${userDetails.verificationCode}<body></html>`
      },
      (error, info) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ message: info.messageId });
        }
      }
    );
  });
};

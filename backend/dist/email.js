"use strict";
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../email.env') });
const user = process.env.REACT_APP_EMAIL_USER;
const pass = process.env.REACT_APP_EMAIL_PASS;
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: pass,
    },
});
async function sendEmail(email, subject, body, html) {
    try {
        const info = await transporter.sendMail({
            from: `"מילי בן עזרא - יצירת קשר" <nimrodschatzman5@gmail.com>`,
            to: email,
            subject: subject,
            text: body,
            html: html,
        });
        console.log("Email sent successfully:", info.messageId);
        return info.messageId;
    }
    catch (error) {
        console.error("Error sending email:", error);
        return null;
    }
}
module.exports = sendEmail;

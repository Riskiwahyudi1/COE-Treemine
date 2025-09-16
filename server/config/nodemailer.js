const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, 
    port: 587,                   
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false  
    }
});

module.exports = transporter;

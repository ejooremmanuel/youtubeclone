const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: '',
    auth: {
        pass: '',
        user: ''
    },
    tls: {
        rejectUnauthorized: false,
    }
})
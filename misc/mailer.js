const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        pass: 'ejoor@2021',
        user: 'ejooremmanuel@gmail.com'
    },
    tls: {
        rejectUnauthorized: false,
    }
})

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'hilda.miller84@ethereal.email',
//         pass: 'EAWKQKJber9NebZzvQ'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

function sendEmail(from, to, subject, html) {

    transport.sendMail({ from, to, subject, html })
        .then((info) => { console.log(info) })
        .catch((err) => { console.log(err) })
}

module.exports = sendEmail;
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        pass: 'Emmanuel.22',
        user: 'icanusetech@gmail.com'
    },
    tls: {
        rejectUnauthorized: false,
    }
})

// const transport = nodemailer.createTransport({
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

function sendEmail(from, to, subject, priority, html) {

    transport.sendMail({ from, to, subject, priority, html })
        .then((info) => { if (info) return true; })
        .catch((err) => { if (err) return false; })
}

module.exports = sendEmail;
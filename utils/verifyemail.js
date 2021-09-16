const sendEmail = require('../misc/mailer')

function verifyUserEmail(req, email, username, secretToken) {

    const html = `
Hello ${username},
<br/>
<br/>
<br/>
Thank you for registering an account with us at WAAWtube.
Click the link below or copy to any browser to verify your acount.
<br/>
<br/>

<a href="http://${req.headers.host}/auth/verify-token/${secretToken}">http://${req.headers.host}/auth/verify-token/${secretToken}</a>

<br/>
<br/>
Kind regards,
<br/>
<strong>Team WAAWTube.</strong>

`
    sendEmail(
        'ejooremmanuel@gmail.com',
        email,
        "Please verify your account",
        html
    )
}
module.exports = verifyUserEmail
module.exports = {
    signup: (req, res) => {
        res.render('auth/signup', { pageTitle: "Sign-Up" })
    },
    login: (req, res) => {
        res.render('auth/login', { pageTitle: "Sign-Up" })
    },
    reset: (req, res) => {
        res.render('auth/reset', { pageTitle: "Sign-Up" })
    }

}
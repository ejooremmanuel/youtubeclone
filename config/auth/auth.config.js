module.exports = {

    isLoggedin: (req, res, next) => {
        if (!req.user) {
            req.flash('error-message', 'You are not logged in. Please log in to continue!');
            return res.redirect('/auth/login')
        }
        next();
    }


}
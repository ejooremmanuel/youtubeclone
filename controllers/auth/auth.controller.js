const bcrypt = require('bcryptjs');
const verifyEmail = require('../../utils/verifyemail');
const User = require('../../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const randomstring = require('randomstring');


passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async(req, email, password, done) => {
    await User.findOne({ $or: [{ email }, { username: email }] })
        .then(async(user) => {
            if (!user) {
                return done(null, false, req.flash('error-message', 'User does not exist. Please use a different one.'));
            }
            bcrypt.compare(password, user.password, (err, passwordMatch) => {
                if (err) {
                    return err;
                }
                if (!passwordMatch) return done(null, false, req.flash('error-message', 'Wrong pasword. Please check your password and try again.'));

                return done(null, user, req.flash('success-message', 'Login Successful.'));
            });
        })
}));

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {

        return done(err, user);
    })
})


module.exports = {
    signup: async(req, res) => {
        await res.render('auth/signup', { pageTitle: "Sign-Up" })
    },
    postSignUp: async(req, res) => {

        const { email, password, confirmPassword, username } = req.body;

        if (password.length < 6) {
            req.flash('error-message', 'Password must be at least 6 characters');
            return res.redirect('back');
        }

        if (password !== confirmPassword) {
            req.flash('error-message', 'Passwords must match!');
            return res.redirect('back');
        }
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            req.flash('error-message', 'Username already taken. Please use a different username.')
            return res.redirect('back')
        }
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            req.flash('error-message', 'Email already taken. Please use a different Email Address.')
            return res.redirect('back')
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const secretToken = randomstring.generate()

        const newUser = await new User({
            email,
            username,
            password: hashedPassword,
            secretToken
        })
        await newUser.save().then(() => {
            req.flash('success-message', 'Registration Successful! Please go to your mailbox to verify your email address.');
            return res.redirect('/auth/login')
        }).catch(() => {
            req.flash('error-message', 'An error occured while creating your account.');
            return res.redirect('back')
        })

        const mailSent = verifyEmail(req, email, username, secretToken);
        console.log(mailSent);



    },
    login: async(req, res) => {
        await res.render('auth/login', { pageTitle: "Sign-Up" })
    },
    postLogin: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true,
        successFlash: true,
        session: true
    }),
    forgotPassword: async(req, res) => {
        await res.render('auth/reset', { pageTitle: "Sign-Up" })
    },
    postForgotPassword: async(req, res) => {

    },
    logout: async(req, res) => {
        await req.logout();
        req.flash('success-message', 'You have logged out successfully!')
        return res.redirect('/auth/login');
    }


}
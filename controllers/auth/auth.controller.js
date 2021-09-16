const bcrypt = require('bcryptjs');
const User = require('../../models/user')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

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
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await new User({
            email,
            username,
            password: hashedPassword
        })

        newUser.save().then(() => {
            req.flash('success-message', 'Registration Successful! You can now Log in.');
            return res.redirect('/auth/login')
        }).catch(() => {
            req.flash('error-message', 'An error occured while creating your account.');
            return res.redirect('back')
        })

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
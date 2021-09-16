const express = require('express');
const { signup, postSignUp, login, postLogin, forgotPassword, postForgotPassword, logout } = require('../../controllers/auth/auth.controller');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const User = require('../../models/user')



//Sign Up Route

router.route('/signup')
    .get(signup)
    .post(postSignUp);

router.route('/login')
    .get(login)
    .post(postLogin);

router.route('/reset')
    .get(forgotPassword)
    .post(postForgotPassword);
router.get('/signout', logout)
module.exports = router;
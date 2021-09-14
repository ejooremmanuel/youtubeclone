const express = require('express');
const { signup, login, reset } = require('../../controllers/auth/auth.controller');
const router = express.Router();


//Sign Up Route

router.get('/signup', signup);

router.get('/login', login);

router.get('/reset', reset);

module.exports = router;
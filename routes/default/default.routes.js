const express = require('express');
const { home } = require('../../controllers/default/default.controller')
const { isLoggedin } = require('../../config/auth/auth.config')

const router = express.Router();


//Home Route
router.get('/', home)


module.exports = router;
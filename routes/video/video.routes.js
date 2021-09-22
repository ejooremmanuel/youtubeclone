const express = require('express');
const router = express.Router();
const { create, postCreate, postUpload } = require('../../controllers/video/video.controller');
const { isLoggedin } = require('../../config/auth/auth.config')

router.route('/create')
    .get(create)
    .post(isLoggedin, postUpload, postCreate);




module.exports = router;
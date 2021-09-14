const express = require('express');
const { home, posthome } = require('../../controllers/default/default.controller')

const router = express.Router();


//Home Route
router.get('/', home)
router.post('/', posthome)


module.exports = router;
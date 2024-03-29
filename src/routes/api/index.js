const express = require('express');
const router = express.Router();

router.get('/users', require('./users/getusers'));

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/users', require('./users/getusers'));
router.get('/users/:id', require('./users/getusersid'));

router.get('/tasks/:id', require('./tasks/getusertasks'));

module.exports = router;
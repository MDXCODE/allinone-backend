const express = require('express');
const router = express.Router();

//users
router.get('/users', require('./users/getusers'));
router.get('/users/:id', require('./users/getusersid'));
router.post('/users', require('./users/postuser'));

//tasks
router.get('/tasks', require('./tasks/getalltasks'));
router.get('/tasks/:id', require('./tasks/getusertasks'));

module.exports = router;
const express = require('express');
const router = express.Router();

//users
router.get('/users', require('./users/get-all-users'));
router.get('/users/:id', require('./users/get-user-by-id'));
router.post('/users', require('./users/post-user'));
router.delete('/users/:id', require('./users/delete-user-by-id'))

//tasks
router.get('/tasks', require('./tasks/get-all-tasks'));
router.get('/tasks/:id', require('./tasks/get-tasks-by-user'));
router.post('/tasks', require('./tasks/post-user-tasks'))
router.delete('/tasks/:id', require('./tasks/delete-task-by-id'))

module.exports = router;
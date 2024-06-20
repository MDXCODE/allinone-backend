const express = require('express');
const router = express.Router();

//users
router.get('/users', require('./users/get-all-users'));
router.get('/users/:id', require('./users/get-user-by-id'));

router.post('/users', require('./users/post-user'));
router.put('/users/:id', require('./users/update-user-by-id'));
router.delete('/users/:id', require('./users/delete-user-by-id'))

//tasks
router.get('/tasks', require('./tasks/get-all-tasks'));
router.get('/tasks/usertasks/:id', require('./tasks/get-tasks-by-user'));
router.get('/tasks/:id', require('./tasks/get-task-by-task-id'));

router.post('/tasks', require('./tasks/post-user-tasks'))
router.put('/tasks/:id', require('./tasks/update-task-by-id'))
router.delete('/tasks/:id', require('./tasks/delete-task-by-id'))

// //notes
// router.get('/notes', require('./notes/get-all-user-notes'));
// router.get('/notes/:id', require('./notes/get-notes-by-user'));
// router.post('/notes', require('./notes/post-user-note'));
// router.put('/notes/:id', require('./notes/update-note-by-id'));
// router.delete('/notes/:id', require('./notes/delete-note-by-id'));

// //pre
// router.post('/login', require('./pre/login-user'));
// router.post('/signout', require('./pre/signout-user'));

module.exports = router;
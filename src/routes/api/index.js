const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../middleware/auth-middleware'); 
const { isAdmin } = require('../../middleware/admin-middleware'); 

// public routes
router.post('/login', require('./auth/user-login'));
router.post('/signup', require('./auth/user-signup'));
router.post('/logout', require('./auth/user-logout'));

// below this comment goes protected routes
router.use(authenticateToken);
router.use(isAdmin);

// Users
router.get('/users', require('./users/get-all-users'));
router.get('/users/:id', require('./users/get-user-by-id'));
router.post('/users', require('./users/post-user'));
router.put('/users/:id', require('./users/update-user-by-id'));
router.delete('/users/:id', require('./users/delete-user-by-id'));

// Tasks
router.get('/tasks', require('./tasks/get-all-tasks'));
router.get('/tasks/usertasks/:id', require('./tasks/get-tasks-by-user'));
router.get('/tasks/:id', require('./tasks/get-task-by-task-id'));
router.post('/tasks', require('./tasks/post-user-tasks'));
router.put('/tasks/:id', require('./tasks/update-task-by-id'));
router.delete('/tasks/:id', require('./tasks/delete-task-by-id'));

// Notes
router.get('/notes', require('./notes/get-all-user-notes'));
router.get('/notes/usernotes/:id', require('./notes/get-notes-by-user'));
router.post('/notes', require('./notes/post-user-note'));



module.exports = router;

const express = require('express');
const router = express.Router();
const { isUser } = require('../../middleware/user-auth-middleware'); 
const { isAdmin } = require('../../middleware/admin-auth-middleware'); 

// Public routes
router.post('/login', require('./auth/user-login'));
router.post('/signup', require('./auth/user-signup'));
router.post('/logout', require('./auth/user-logout'));

// User protected routes
//router.use(isUser);

// Users routes 
router.get('/users/details', isUser, require('./users/userroute/get-user-details'));
router.put('/users/update', isUser, require('./users/userroute/update-user-details'));

// Tasks
router.get('/tasks/usertasks', isUser, require('./tasks/get-tasks-by-user')); 
router.get('/tasks/:id', isUser, require('./tasks/get-task-by-task-id'));  
router.post('/tasks', isUser, require('./tasks/post-user-tasks'));
router.put('/tasks/:id', isUser, require('./tasks/update-task-by-id'));
router.delete('/tasks/:id', isUser, require('./tasks/delete-task-by-id'));


// Notes 
router.get('/notes/usernotes', isUser, require('./notes/get-notes-by-user'));
router.post('/notes', isUser, require('./notes/post-user-note'));

// Admin-protected routes
//router.use(isAdmin);

router.get('/admin/users', isUser, isAdmin, require('./users/adminroute/get-all-users'));
router.post('/admin/users', isUser, isAdmin, require('./users/adminroute/post-user'));
router.get('/admin/users/:id', isUser, isAdmin, require('./users/adminroute/get-user-by-id'));
router.delete('/admin/users/:id', isUser, isAdmin, require('./users/adminroute/delete-user-by-id'));
router.put('/admin/users/:id', isUser, isAdmin, require('./users/adminroute/update-user-by-id'));

router.get('/admin/tasks', isUser, isAdmin, require('./tasks/adminroute/get-all-tasks')); 

router.get('/admin/notes', isUser, isAdmin, require('./notes/get-all-user-notes')); 

module.exports = router;

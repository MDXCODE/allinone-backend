const express = require('express');
const router = express.Router();
const { isUser } = require('../../middleware/user-auth-middleware'); 
const { isAdmin } = require('../../middleware/admin-auth-middleware'); 

// Public routes
router.get('/auth/check', isUser, require('./auth/user-check'));
router.post('/auth/login', require('./auth/user-login'));
router.post('/auth/signup', require('./auth/user-signup'));
router.post('/auth/logout', require('./auth/user-logout'));

// User protected routes
//router.use(isUser);

// Users routes 
router.get('/users/details', isUser, require('./users/user/get-user-details'));
router.put('/users/update', isUser, require('./users/user/update-user-details'));

// Tasks
// will need a route to get a specific users tasks


// Notes 
// will need a route to get a specific users notes

// Admin-protected routes
//router.use(isAdmin);

router.get('/admin/users', isUser, isAdmin, require('./users/admin/get-all-users'));
router.post('/admin/users', isUser, isAdmin, require('./users/admin/post-user'));
router.get('/admin/users/:id', isUser, isAdmin, require('./users/admin/get-user-by-id'));
router.delete('/admin/users/:id', isUser, isAdmin, require('./users/admin/delete-user-by-id'));
router.put('/admin/users/:id', isUser, isAdmin, require('./users/admin/update-user-by-id'));

router.get('/admin/tasks', isUser, isAdmin, require('./tasks/admin/get-all-tasks')); 
router.get('/admin/tasks/usertasks', isUser, isAdmin, require('./tasks/admin/get-tasks-by-user')); 
router.get('/admin/tasks/:id', isUser, isAdmin, require('./tasks/admin/get-task-by-task-id'));  
router.post('/admin/tasks', isUser, isAdmin, require('./tasks/admin/post-user-tasks'));
router.put('/admin/tasks/:id', isUser, isAdmin, require('./tasks/admin/update-task-by-id'));
router.delete('/admin/tasks/:id', isUser, isAdmin, require('./tasks/admin/delete-task-by-id'));

router.get('/admin/notes', isUser, isAdmin, require('./notes/admin/get-all-user-notes')); 
router.get('/admin/notes/usernotes', isUser, isAdmin, require('./notes/admin/get-notes-by-user'));
router.post('/admin/notes', isUser, isAdmin, require('./notes/admin/post-user-note'));

module.exports = router;

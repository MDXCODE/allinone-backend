const express = require('express');
const router = express.Router();
const { isUser } = require('../../middleware/user-auth-middleware'); 
const { isAdmin } = require('../../middleware/admin-auth-middleware'); 

// Public routes
router.get('/auth/check', isUser, require('./auth/user-check'));
router.post('/auth/login', require('./auth/user-login'));
router.post('/auth/signup', require('./auth/user-signup'));
router.post('/auth/logout',  require('./auth/user-logout'));

// User protected routes
//router.use(isUser);

// Users routes 
router.get('/users/details', isUser, require('./users/user/get-user-details'));
router.put('/users/update', isUser, require('./users/user/update-user-details'));

// Projects
router.get('/projects/userprojects', isUser, require('./projects/user/get-projects-by-user'));
router.post('/projects', isUser, require('./projects/user/post-user-project'));
//router.post('/projects/tasks', isUser, require('./projects/user/post-task-to-project.js'));
router.delete('/projects', isUser, require('./projects/user/delete-project-by-id'))

// Notes
router.get('/notes/usernotes', isUser, require('./notes/user/get-notes-by-user'));
router.post('/notes', isUser, require('./notes/user/post-user-note'));
router.put('/notes', isUser, require('./notes/user/edit-user-note'));
router.delete('/notes', isUser, require('./notes/user/delete-user-note'));

// Tasks
router.get('/tasks/usertasks', isUser, require('./tasks/user/get-tasks-by-user')); 
router.get('/tasks/completedtasks', isUser, require('./tasks/user/get-completed-tasks-by-user')); 
router.post('/tasks', isUser, require('./tasks/user/post-user-task'));
router.put('/tasks', isUser, require('./tasks/user/edit-user-task'));
router.put('/tasks/complete', isUser, require('./tasks/user/complete-task'));
router.delete('/tasks', isUser, require('./tasks/user/delete-user-task'));

// Reminders
router.get('/reminders/userreminders', isUser, require('./reminders/user/get-reminders-by-user'));
router.post('/reminders', isUser, require('./reminders/user/post-user-reminder'));
router.put('/reminders', isUser, require('./reminders/user/edit-user-reminder'));
router.delete('/reminders', isUser, require('./reminders/user/delete-user-reminder'));

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

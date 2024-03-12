const express = require('express');
const router = express.Router();

const tasksController = require('./controllers/tasks.Controller');
const tasksMiddiware = require('./middiewares/tasksMiddieware');

router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddiware.validateBody,tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', tasksController.updateTask);

module.exports = router;

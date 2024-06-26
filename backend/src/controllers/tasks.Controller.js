const tasksnodels = require('../models/tasksmodels');

const getAll = async (_request, response) => {
  const tasks = await tasksnodels.getAll();
  return response.status(200).json(tasks);
};

const createTask = async (request, response) => {
  const createdTask = await tasksnodels.createTask(request.body);
  return response.status(201).json(createdTask);
};

const deleteTask = async (request, response) => {
  const { id } = request.params;
  await tasksnodels.deleteTask(id);
  return response.status(204).json();
};

const updateTask = async (request, response) => {
  const { id } = request.params;
  await tasksnodels.updateTask(id, request.body);
  return response.status(204).json();
};


module.exports = { 
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
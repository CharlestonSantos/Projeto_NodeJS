const connection = require('./connection');

//Lista as tarefas
const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};

//Criar as tarefas
const createTask = async (task) => {
  const { title } = task;
  const dateUTC = new Date(Date.now()).toUTCString();
  const query = 'INSERT INTO tasks(title, status, create_at) VALUES (?, ?, ?)';
  const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]);
  return {insertId: createdTask.insertId};
};

//Deletar uma tarefa
const deleteTask = async (id) => {
  const [removedTask] = await connection.execute(' DELETE FROM tasks WHERE ID = ?',[id]);
  return removedTask;
};

// Alterar uma tarefa 
const updateTask = async (id, task) => {
  const { title, status } = task;
  const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';  
  const [updatedTask] = await connection.execute(query, [title, status, id]);
  
  return updatedTask;
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
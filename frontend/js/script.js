//const { options } = require('../../backend/src/router');

const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks')
    const tasks = await response.json();
    return tasks;
}

//adicionar uma tarefa
const addTask = async (event) => {
    event.preventDefault();

    const task = { title: inputTask.value };

    await fetch('http://localhost:3333/tasks', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });

    loadTasks();
    inputTask.value = ''; 
}

//Deletar uma tarefa
const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete',
    });

    loadTasks();
}

//Alterar uma tarefa
const updateTask = async (task) => {

   const { id, title, status } = task;

    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status }),
    });

    loadTasks();
}


// Formatando a data
const formatDate = (dateUTC) => {
    const options = { dateStyle: 'short', timeStyle: 'short' };
    const date = new Date(dateUTC).toLocaleString('pt-br', options);
    return date;
}

// Função para criar os elementos
const createElement = (tag, innerText = '', innerHtml = '') => {
    const element = document.createElement(tag);

    if (innerText) {
        element.innerText = innerText;
    }
    if (innerHtml) {
        element.innerHtml = innerHtml;
    }
    return element;
}

// criar o select   
const createSelect = (value) => {
    const options = 
    ` <option value="pendente">pendente</option>,
      <option value='em andamento'>em andamento</option>,
      <option value='concluída'>concluída</option>,
    `;

    const select = createElement('select', '', options);

    select.value = value;

    return select;
}

//Criar as linhas da tabela
const createRow = (task) => {
    const { id, title,  create_at, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreateAt = createElement('td', formatDate(create_at));
    const tdStatus = createElement('td');  
    const tdActions = createElement('td');
    
    const select = createSelect(status);

    select.addEventListener('change', ({target}) => updateTask({ ...task, status: target.value }));

    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

    //Criação de um formulário
    const editForm = createElement('form');
    const editInput = createElement('input');

    editInput.value = title;
    editForm.appendChild(editInput);

    //editando o titulo das tarefas
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();

        updateTask({ id, title: editInput.value, status });
    });

    editButton.addEventListener('click', () => {
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm);
    });

    editButton.classList.add('btn_action');
    deleteButton.classList.add('btn_action');

    deleteButton.addEventListener('click', () => deleteTask(id));

    tdStatus.appendChild(select);
    
    // Adicionar os botões nas colunas
    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreateAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    return tr;
}
//createRow(task)

// Carregar os dados na tabelas
const loadTasks = async () => {
    const tasks = await fetchTasks();

    tbody.innerHTML = '';

    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask);
loadTasks();






// bloqueio temporario
/*
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks')
    const tasks = await response.json()
    return tasks;
}

// Função para criar os elementos html
const createElement = (tag, innerText = '', innerHtml = '') => {
  const element = document.createElement(tag);

  if (innerText){
      element.innerText = innerText;
  }
  if (innerHtml){
          element.innerHtml = innerHtml;
      }
  return element;
}

const createSelect = (value) => {
    const options = `
      <option value="pendente">pendente</option>
      <option value="em andamento">em andamento</option>
      <option value="concluída">concluida</option>
    `;

    const select = createElement('select', '', options);

    select.value = value;

    return select;
}

const task = {
  id: 1,
  title: 'novo lançamento',
  create_at: '00 Janeiro 2024',
  status: 'concluida'
}

const createRow = (task) => {
  const { id, title, created_at, status } = task;

  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreateAt = createElement('td', concluida);
  const tdStatus = createElement('td');
  const tdActions = createElement('td');
  

  const select = createSelect();

  const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
  const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');
  
  //tr.appendChild(editButton);
 // tbody.appendChild(tr);

  editButton.classList.add('btn_action');
  deleteButton.classList.add('btn_action');

  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreateAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  tbody.appendChild(tr);
}
createRow(task)

*/

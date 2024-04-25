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
const updateTask = async ({id, title, status}) => {

   //const { id, title, status } = task;

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

const createSelect = (Value) => {
    const select = document.createElement('select');

    // Defina as opções desejadas para o select
    const options = [
        { value: 'pendente', text: 'pendente' },
        { value: 'em andamento', text: 'em andamento' },
        { value: 'concluída', text: 'concluída' }
    ];

    // Iterar sobre as opções e adicionar ao select
    options.forEach(option => {
        const { value, text } = option;
        const optionElement = document.createElement('option');
        optionElement.value = value;
        optionElement.text = text;
        select.appendChild(optionElement);
    });

    // Defina o valor padrão do select
    select.value = Value;

    return select;
};  

// criar o select   
/*
const createSelect = (value) => {
    const options = `
      <option value="pendente">pendente</option>
      <option value="em andamento">em andamento</option>
      <option value="concluída">concluída</option>
    `;

    const select = createElement('select', '', options);

    select.value = value;

    return select;
}*/

//Criar as linhas da tabela
const createRow = (task) => {
    const { id, title,  create_at, status } = task;

    const select = createSelect(status);

    select.addEventListener('change', ({ target }) => updateTask({ ...task, status:target.value}));

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreateAt = createElement('td', formatDate(create_at));
    const tdStatus = createElement('td');  
    const tdActions = createElement('td');
    
    
    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', '','<span class="material-symbols-outlined">delete</span>');

    
    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');
    
    
    //Criação de um formulário
    const editForm = createElement('form');
    const editInput = createElement('input');

    //editando o titulo das tarefas
    editInput.value = title;
    editForm.appendChild(editInput);
    
   
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();

        updateTask({ id, title: editInput.value, status });
    });

    editButton.addEventListener('click', () => {
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm);
    });


    deleteButton.addEventListener('click', () => deleteTask(id));

    tdStatus.appendChild(select);

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

   tr.appendChild(tdTitle);
   tr.appendChild(tdCreateAt);
   tr.appendChild(tdStatus);
   tr.appendChild(tdActions);   
     
    return tr;
}

// Carregar os dados na tabelas
const loadTasks = async () => {
    const tasks = await fetchTasks();

    tbody.innerHTML = '';

    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}
//Ler as Tarefas();
addForm.addEventListener('submit', addTask);
loadTasks();

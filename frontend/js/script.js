const fetchTask = async () => {
    const response = await fetch('http://localhost:3333/tasks')
    const tasks = await response.json()
    return tasks;
}

// Função para criar os elementos
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

const task = {
    id: 1,
    title: 'novo lançamento',
    create_at: '00 Janeiro 2024',
    status: pendente
}

const createTask = (tasks) => {
    const { id, title, created_at, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreateAt = createElement('td', created_at);
    const tdActions = createElement('td');
    const tdStatus = createElement('td');

    const editButton = createElement('button', '','<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', '','<span class="material-symbols-outlined">delete</span>');
    tr.appendChild(editButton);
    tbody.appendChild(tr);

    editButton.classList.add('btn_action');
    editButton.classList.add('btn_action');

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreateAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
}
//createRow(task)


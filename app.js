const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    saveLocalTodos(todoInput.value);
    saveLocalState(false);

    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", () => {
            todo.remove();
        })
    }

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');

        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        }
        else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        const todoIndex = todo.children[0].innerText;
        let index = todos.indexOf(todoIndex);
        let states;
        if (localStorage.getItem('states') === null) {
            states = [];
        }
        else {
            states = JSON.parse(localStorage.getItem('states'));
        }
        if (states[index] == 'true') states[index] = 'false';
        else states[index] = 'true';
        localStorage.setItem("states", JSON.stringify(states));

    }
}

function filterTodo(e) {
    const todos = todoList.childNodes; 
    todos.forEach(todo => {
        switch (e.target.value) {
            case 'all': 
                todo.style.display = 'flex';
                break;
            case 'completed': 
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalState(state) {
    let states;
    if (localStorage.getItem('states') === null) {
        states = [];
    }
    else {
        states = JSON.parse(localStorage.getItem('states'));
    }
    states.push(state);
    localStorage.setItem('states', JSON.stringify(states));
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    let states;
    if (localStorage.getItem('states') === null) {
        states = [];
    }
    else {
        states = JSON.parse(localStorage.getItem('states'));
    }

    let index = 0;
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        if (states[index] === 'true') {
            todoDiv.classList.toggle('completed');
        }

        todoList.appendChild(todoDiv);
        index++;
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    
    let states;
    if (localStorage.getItem('states') === null) {
        states = [];
    }
    else {
        states = JSON.parse(localStorage.getItem('states'));
    }
    states.splice(states.indexOf(todoIndex), 1);
    localStorage.setItem("states", JSON.stringify(states));
}
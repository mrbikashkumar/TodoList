// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList .task-item').forEach(item => {
        const task = {
            text: item.querySelector('span').textContent,
            completed: item.querySelector('input').checked
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = function () {
            taskItem.classList.toggle('completed');
            saveTasks(); // Save tasks when a checkbox is clicked
        };

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            taskList.removeChild(taskItem);
            saveTasks(); // Save tasks after a task is deleted
        };

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

// Add a task
document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.onclick = function () {
        taskItem.classList.toggle('completed');
        saveTasks(); // Save tasks when a checkbox is clicked
    };

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        taskList.removeChild(taskItem);
        saveTasks(); // Save tasks after a task is deleted
    };

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    taskInput.value = '';
    saveTasks(); // Save tasks after a new task is added
}

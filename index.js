class Task {
    constructor(name, dueDate) {
        this.name = name;
        this.dueDate = dueDate;
        this.isCompleted = false;
    }
}

const tasks = [];

const addTaskBtn = document.getElementById('addTaskBtn');
const viewTasksDropdown = document.getElementById('viewTasksDropdown');
const taskList = document.getElementById('taskList');
const taskNameInput = document.getElementById('taskName');
const dueDateInput = document.getElementById('dueDate');

addTaskBtn.addEventListener('click', () => {
    const taskName = taskNameInput.value.trim();
    const dueDate = dueDateInput.value;

    try {
        if (!taskName || !dueDate) {
            throw new Error('Task name and due date are required.');
        }

        const newTask = new Task(taskName, dueDate);
        tasks.push(newTask);
        displayTasks(viewTasksDropdown.value);
        taskNameInput.value = '';
        dueDateInput.value = '';
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

function toggleTaskCompletion(taskIndex) {
    tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
    displayTasks(viewTasksDropdown.value);
}

function addTaskToList(task, index) {
    const li = document.createElement('li');
    li.textContent = `${task.name} (Due: ${task.dueDate})`;
    
    if (task.isCompleted) {
        li.classList.add('completed');
    } else {
        li.classList.add('pending');
        li.addEventListener('click', () => toggleTaskCompletion(index));
    }

    taskList.appendChild(li);
}

viewTasksDropdown.addEventListener('change', () => {
    displayTasks(viewTasksDropdown.value);
});

function displayTasks(view) {
    taskList.innerHTML = '';

    switch (view) {
        case 'All Tasks':
            tasks.forEach((task, index) => addTaskToList(task, index));
            break;
        case 'Completed Tasks':
            tasks.filter(task => task.isCompleted).forEach((task, index) => addTaskToList(task, index));
            break;
        case 'Pending Tasks':
            tasks.filter(task => !task.isCompleted).forEach((task, index) => addTaskToList(task, index));
            break;
        default:
            alert('Invalid view option');
    }
}

displayTasks(viewTasksDropdown.value);

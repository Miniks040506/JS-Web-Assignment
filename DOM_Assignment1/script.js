'use strict';

const taskForm = document.querySelector('#task-form');
const taskTitleInput = document.querySelector('#task-title');
const taskSubjectInput = document.querySelector('#task-subject');
const taskPriorityInput = document.querySelector('#task-priority');
const taskMinutesInput = document.querySelector('#task-minutes');
const formError = document.querySelector('#form-error');

const taskList = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const resultMessage = document.querySelector('#result-message');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('#search-input');
const sortSelect = document.querySelector('#sort-select');

const statTotal = document.querySelector('#stat-total');
const statCompleted = document.querySelector('#stat-completed');
const statRemaining = document.querySelector('#stat-remaining');
const statMinutes = document.querySelector('#stat-minutes');

const clearCompletedBtn = document.querySelector('#clear-completed-btn');
const themeBtn = document.querySelector('#theme-btn');

const confirmModal = document.querySelector('#confirm-modal');
const modalOverlay = document.querySelector('#modal-overlay');
const modalCloseBtn = document.querySelector('#modal-close-btn');
const modalCancelBtn = document.querySelector('#modal-cancel-btn');
const modalConfirmBtn = document.querySelector('#modal-confirm-btn');

// ------------------------------
// Application state
// ------------------------------
let tasks = [
  {
    id: 1,
    title: 'Review JavaScript arrays',
    subject: 'JavaScript',
    priority: 'high',
    minutes: 45,
    completed: false,
    createdAt: Date.now() - 3000,
  },
  {
    id: 2,
    title: 'Practice querySelector',
    subject: 'DOM',
    priority: 'medium',
    minutes: 30,
    completed: true,
    createdAt: Date.now() - 2000,
  },
  {
    id: 3,
    title: 'Improve responsive layout',
    subject: 'HTML/CSS',
    priority: 'low',
    minutes: 60,
    completed: false,
    createdAt: Date.now() - 1000,
  },
];

let nextTaskId = 4;
let currentFilter = 'all';
let currentSort = 'newest';
let currentSearch = ''; // gia tri ko phai boolean -> if () : can boolean, vay quang currentSearch nay vo trong if else thi : truthy/falsy: 0, '', null, NaN, ...
let pendingDeleteId = null;

const priorityRank = {
    high: 3,
    medium: 2,
    low: 1,
};

// Custom high-order function
const processTasks = (taskArray, callback) => {
    taskArray.forEach(task => callback(task));
}

// Render task

const getVisibleTasks = () => {
    let visibleTasks = [...tasks];
    
    if (currentFilter === 'active') {
        visibleTasks = visibleTasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        visibleTasks = visibleTasks.filter(task => task.completed);
    } else if (currentFilter === 'high') {
        visibleTasks = visibleTasks.filter(task => task.priority === 'high');
    }
    
    //java: if (!current.isEmpty())
    if (currentSearch) {
        visibleTasks = visibleTasks.filter(task => {
            const title = task.title.toLowerCase();
            const subject = task.subject.toLowerCase();
            return title.includes(currentSearch) || subject.includes(currentSearch);
        });
    }
    
    // sort 
    if (currentSort === 'newest') {
        visibleTasks.sort((a, b) => b.createdAt - a.createdAt);
    } else if (currentSort === 'oldest') {
        visibleTasks.sort((a, b) => a.createdAt - b.createdAt);
    } else if (currentSort === 'priority') {
        visibleTasks.sort((a, b) => priorityRank[b.priority] - priorityRank[a.priorityRank])
    } else if (currentSort === 'minutes') {
        visibleTasks.sort((a, b) => b.minutes - a.minutes);
    }
    
    return visibleTasks;
};

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed);
    const activeTasks = tasks.filter(task => !task.completed);
    
    const minutesLeft = activeTasks.reduce(
        (total, task) => total + task.minutes, 0 
    );
    
    statTotal.textContent = tasks.length;
    statCompleted.textContent = completedTasks.length;
    statRemaining.textContent = activeTasks.length;
    statMinutes.textContent = minutesLeft;
}

const createTaskMarkup = task => `
    <article class="task-card ${task.completed ? 'completed' : ''}" data-id="${task.id}">
        <input
            class="task-check"
            type="checkbox"
            data-action="toggle"
            data-id="${task.id}"
            ${task.completed ? 'checked' : ''}
            aria-label="Mark ${task.title} ${task.completed ? 'active' : 'completed'}"
        />

        <div>
            <h3 class="task-title">${task.title}</h3>
            <div class="task-meta">
                <span>${task.subject}</span>
                <span class="badge ${task.priority}">${task.priority}</span>
                <span>${task.minutes} min</span>
            </div>
        </div>

        <button
            class="task-action"
            type="button"
            data-action="delete"
            data-id="${task.id}"
        >
            Delete
        </button>
    </article>
`; // article -> inline/block

const renderTasks = () => {
    const visibleTasks = getVisibleTasks();
    const markupParts = [];
    
    processTasks(visibleTasks, task => {
        markupParts.push(createTaskMarkup(task));
    });
    
    // create array of id which be useful for debugging/extension
    const visibleIds = visibleTasks.map(task => task.id);
    taskList.dataset.visibleIds = visibleIds.join(',');
    
    taskList.innerHTML = markupParts.join('');
    
    const hasVisibleTasks = visibleTasks.length > 0;
    emptyState.classList.toggle('hidden', hasVisibleTasks);
    
    resultMessage.textContent = `${visibleTasks.length} of ${tasks.length} task${tasks.length === 1 ? '': 's'} shown`;
    
    updateStats();
};

//filter + search + sort
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentFilter = button.dataset.filter;
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active')
        
        renderTasks();
    });
});

searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.trim().toLowerCase();
    renderTasks();
});

sortSelect.addEventListener('change', () => {
    currentSort = sortSelect.value;
    renderTasks();
});

// clear complete
clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
});

// theme: dark / light mode
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
})

const openModal = () => {
    confirmModal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
};

const closeModal = () => {
    confirmModal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
    pendingDeleteId = null;
};

// show delete + checkbox ani
taskList.addEventListener('click', event => {
    const deleteButton  = event.target.closest('[data-action="delete"]');
    
    if (!deleteButton) return;
    
    pendingDeleteId = Number(deleteButton.dataset.id);
    openModal();
});

taskList.addEventListener('change', event => {
    const checkbox = event.target.closest('[data-action="toggle"]');
    
    if (!checkbox) {
        return;
    }
    
    const taskId = Number(checkbox.dataset.id);
    const task = tasks.find(item => item.id === taskId);
    
    if (!task) {
        return;
    }
    
    task.completed = checkbox.checked;
    renderTasks();
});

const resetForm = () => {
    taskForm.reset();
    taskPriorityInput.value = 'medium';
    taskMinutesInput.value = 30;
    taskTitleInput.focus(); 
};

// validate + error
function validateTask(title, minutes) {
    if (title.length === 0) return 'Task title is required';
    if (title.length < 3) return 'Task title must contain at least 3 characters';
    if (minutes < 5) return 'Estimated time must be at least 5 minutes';
    if (minutes > 240) return 'Estimated time cannot be greater than 240 minutes';
    return ''; 
}

// Add
taskForm.addEventListener('submit', event => {
    event.preventDefault();
    
    const title = taskTitleInput.value.trim();
    const subject = taskSubjectInput.value;
    const priority = taskPriorityInput.value;
    const minutes = Number(taskMinutesInput.value);
    
    const errorMessage = validateTask(title, minutes);
    
    if (errorMessage) {
        formError.textContent = errorMessage;
        return;
    }
    
    formError.textContent = '';
    
    const newTask = {
        id: nextTaskId,
        title,
        subject,
        priority,
        minutes,
        completed: false,
        createdAt: Date.now(),
    };
    
    nextTaskId++;
    tasks.push(newTask);
    
    resetForm();
    renderTasks();
});

// delete
modalConfirmBtn.addEventListener('click', () => {
    if (pendingDeleteId === null) return;
    
    tasks = tasks.filter(task => task.id !== pendingDeleteId);
    closeModal();
    renderTasks();
});

modalCancelBtn.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', event => {
    const modalIsOpen = !confirmModal.classList.contains('hidden');
    
    if (event.key === 'Escape' && modalIsOpen) {
        closeModal();
    }
});

renderTasks();
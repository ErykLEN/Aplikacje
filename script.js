// Elementy HTML
const taskInput = document.getElementById('new-task');
const taskDateInput = document.getElementById('task-date');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search');

// Inicjalizacja zadań z Local Storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Funkcja dodająca nowe zadanie
function addTask() {
    const taskText = taskInput.value.trim();
    const taskDate = taskDateInput.value;

    // Walidacja: tekst od 3 do 255 znaków, data w przyszłości lub pusta
    if (taskText.length < 3 || taskText.length > 255) {
        alert('Zadanie musi mieć od 3 do 255 znaków.');
        return;
    }
    if (taskDate && new Date(taskDate) <= new Date()) {
        alert('Data musi być w przyszłości.');
        return;
    }

    const task = {
        text: taskText,
        date: taskDate || null,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskDateInput.value = '';
}

// Funkcja zapisu zadań do Local Storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Funkcja renderująca zadania
function renderTasks(searchText = '') {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchText.toLowerCase()));

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const taskText = document.createElement('span');
        taskText.contentEditable = true;
        taskText.innerHTML = highlightSearch(task.text, searchText);
        taskText.addEventListener('input', () => editTask(index, taskText.innerText));

        /*const taskDate = document.createElement('span');
        if (task.date) {
            taskDate.textContent = ` (do: ${new Date(task.date).toLocaleString()})`;
        } else {
            taskDate.textContent = ' (Brak terminu)';
        }*/

        const taskDateInput = document.createElement('input');
        taskDateInput.type = 'date';
        taskDateInput.value = task.date ? task.date.split('T')[0] : '';

        taskDateInput.addEventListener('change', () => editTaskDate(index, taskDateInput.value));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Usuń';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(taskDateInput); // Dodanie daty obok zadania
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Funkcja edycji zadania
function editTask(index, newText) {
    tasks[index].text = newText.trim();
    saveTasks();
}

function editTaskDate(index, newDate) {
    tasks[index].date = newDate;
    saveTasks(); // Zapisujemy zmiany do Local Storage
    renderTasks(); // Odswieżamy listę zadań
}

// Funkcja usuwania zadania
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Funkcja podświetlania wyszukiwanego tekstu
function highlightSearch(text, searchText) {
    if (!searchText) return text;
    const regex = new RegExp(`(${searchText})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Obsługa wyszukiwania
searchInput.addEventListener('input', (e) => {
    renderTasks(e.target.value);
});

// Obsługa dodawania zadań
document.getElementById('add-task').addEventListener('click', addTask);

// Renderowanie zadań na początku
renderTasks();

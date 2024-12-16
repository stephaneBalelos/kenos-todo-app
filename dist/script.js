document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    let tasks = loadTasksFromLocalStorage();

    // Meditationsbereich
    const meditationButton = document.getElementById('meditation-button');
    const meditationTips = document.getElementById('meditation-tips');

    addTaskButton.addEventListener('click', addTask);
  
    meditationButton.addEventListener('click', () => {
        // Toggle visibility der Meditationsanleitung
        meditationTips.style.display = meditationTips.style.display === 'none' ? 'block' : 'none';
    });

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, done: false });
            saveTasksToLocalStorage(tasks);
            renderTasks();
            newTaskInput.value = '';
        }
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const row = taskList.insertRow();
            const checkCell = row.insertCell();
            const taskCell = row.insertCell();
            const doneCell = row.insertCell();

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.done;
            checkbox.addEventListener('change', () => {
                tasks[index].done = checkbox.checked;
                saveTasksToLocalStorage(tasks);
                renderTasks();
                if (checkbox.checked) {
                    window.location.href = 'belohnung.html'; 
                }
            });
            checkCell.appendChild(checkbox);

            const taskSpan = document.createElement('span');
            taskSpan.setAttribute('contenteditable', 'true');
            taskSpan.textContent = task.text;
            if (task.done) {
                doneCell.appendChild(taskSpan);
                doneCell.classList.add('done');
            } else {
                taskCell.appendChild(taskSpan);
            }
        });
    }

    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const challengeInput = document.getElementById('challenge-input');
    const challengeDone = document.getElementById('challenge-done');
    const confettiImage = document.getElementById('confetti-image');

    challengeInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            challengeDone.checked = true;
            event.preventDefault();
            confettiImage.style.display = 'block';
            // Konfetti nach 3 Sekunden ausblenden
            setTimeout(() => {
                confettiImage.style.display = 'none';
                challengeDone.checked = false; // Optional: Checkbox zurücksetzen
            }, 3000);
        }
    });

    challengeDone.addEventListener('change', handleChallengeDone);

    function handleChallengeDone() {
        if (challengeDone.checked) {
            confettiImage.style.display = 'block';
            // Konfetti nach 3 Sekunden ausblenden
            setTimeout(() => {
                confettiImage.style.display = 'none';
                challengeDone.checked = false; // Optional: Checkbox zurücksetzen
            }, 3000);
        } else {
            confettiImage.style.display = 'none';
        }
    }

    renderTasks();
});
// Stockage des tâches
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let editingTaskId = null;

        // Éléments DOM
        const taskList = document.getElementById('taskList');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskModal = document.getElementById('taskModal');
        const closeModal = document.getElementById('closeModal');
        const cancelTask = document.getElementById('cancelTask');
        const taskForm = document.getElementById('taskForm');
        const modalTitle = document.getElementById('modalTitle');
        const searchInput = document.getElementById('searchInput');

        // Initialiser l'application
        document.addEventListener('DOMContentLoaded', () => {
            renderTasks();
            setupEventListeners();
        });

        // Configurer les écouteurs d'événements
        function setupEventListeners() {
            addTaskBtn.addEventListener('click', openAddTaskModal);
            closeModal.addEventListener('click', closeTaskModal);
            cancelTask.addEventListener('click', closeTaskModal);
            taskForm.addEventListener('submit', handleTaskSubmit);
            searchInput.addEventListener('input', searchTasks);
        }

        // Ouvrir le modal pour ajouter une tâche
        function openAddTaskModal() {
            editingTaskId = null;
            modalTitle.textContent = 'Nouvelle tâche';
            taskForm.reset();
            document.querySelector('input[name="priority"][value="Moyenne"]').checked = true;
            taskModal.style.display = 'flex';
        }

        // Ouvrir le modal pour modifier une tâche
        function openEditTaskModal(taskId) {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                editingTaskId = taskId;
                modalTitle.textContent = 'Modifier la tâche';

                document.getElementById('taskId').value = task.id;
                document.getElementById('taskName').value = task.name;
                document.getElementById('taskLabel').value = task.label;
                document.getElementById('taskDate').value = task.date;
                document.getElementById('taskTime').value = task.time;
                document.querySelector(`input[name="priority"][value="${task.priority}"]`).checked = true;
                document.getElementById('taskReminder').checked = task.reminder;
                document.getElementById('taskStatus').value = task.status;

                taskModal.style.display = 'flex';
            }
        }

        // Fermer le modal
        function closeTaskModal() {
            taskModal.style.display = 'none';
        }

        // Gérer l'envoi du formulaire (ajout/modification)
        function handleTaskSubmit(e) {
            e.preventDefault();

            const taskName = document.getElementById('taskName').value;
            const taskLabel = document.getElementById('taskLabel').value;
            const taskDate = document.getElementById('taskDate').value;
            const taskTime = document.getElementById('taskTime').value;
            const taskPriority = document.querySelector('input[name="priority"]:checked').value;
            const taskReminder = document.getElementById('taskReminder').checked;
            const taskStatus = document.getElementById('taskStatus').value;

            if (!taskName) {
                alert('Le libellé de la tâche est requis');
                return;
            }

            const taskData = {
                id: editingTaskId || Date.now().toString(),
                name: taskName,
                label: taskLabel,
                date: taskDate,
                time: taskTime,
                priority: taskPriority,
                reminder: taskReminder,
                status: taskStatus,
                createdAt: new Date().toISOString()
            };

            if (editingTaskId) {
                // Modifier la tâche existante
                const index = tasks.findIndex(t => t.id === editingTaskId);
                if (index !== -1) {
                    tasks[index] = taskData;
                }
            } else {
                // Ajouter une nouvelle tâche
                tasks.push(taskData);
            }

            saveTasks();
            renderTasks();
            closeTaskModal();
        }

        // Supprimer une tâche
        function deleteTask(taskId) {
            if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
                tasks = tasks.filter(t => t.id !== taskId);
                saveTasks();
                renderTasks();
            }
        }

        // Basculer le statut d'une tâche
        function toggleTaskStatus(taskId) {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.status = task.status === 'completed' ? 'pending' : 'completed';
                saveTasks();
                renderTasks();
            }
        }

        // Enregistrer les tâches dans le localStorage
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Afficher les tâches
        function renderTasks(filteredTasks = null) {
            const tasksToRender = filteredTasks || tasks;

            if (tasksToRender.length === 0) {
                taskList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-tasks"></i>
                        <p>Aucune tâche pour le moment</p>
                        <p class="task-date">Commencez par ajouter votre première tâche</p>
                    </div>
                `;
                return;
            }

            taskList.innerHTML = tasksToRender.map(task => {
                // Classes CSS en fonction des propriétés de la tâche
                const priorityClass = {
                    Importante: 'Importante',
                    Moyenne: 'Moyenne',
                    Faible: 'Faible'
                }[task.priority];

                const statusClass = {
                    pending: 'status-pending',
                    'in-progress': 'status-in-progress',
                    completed: 'status-completed'
                }[task.status];

                const labelClass = {
                    Travail: 'Travail',
                  Personnel: 'Personnel',
                  Etudes: 'Études',
                  Activités : "Activités",
                  Autre:"Autre"
                }[task.label] || '';

                // Formater la date si elle existe
                const formattedDate = task.date ? formatDate(task.date) : '';

                // Afficher l'alarme si elle est activée
                const reminderIcon = task.reminder ? '<i class="fas fa-bell" style="color: #3b82f6; margin-left: 0.5rem;"></i>' : '';

                return `
                    <div class="task-card" data-task-id="${task.id}">
                        <div class="task-header">
                            <h2 class="task-title ${task.status === 'completed' ? 'task-completed' : ''}">
                                ${task.name}
                            </h2>
                            <div class="task-actions">
                                <button class="action-btn edit" onclick="openEditTaskModal('${task.id}')">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="action-btn delete" onclick="deleteTask('${task.id}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="task-meta">
                            ${task.date ? `<span class="task-date"><i class="far fa-calendar"></i> ${formattedDate}</span>` : ''}
                            ${task.time ? `<span class="task-date"><i class="far fa-clock"></i> ${task.time}</span>` : ''}
                            ${reminderIcon}
                            <span class="priority ${priorityClass}">
                                <i class="fas fa-circle" style="font-size: 0.5rem; margin-right: 0.3rem;"></i>
                                ${getPriorityText(task.priority)}
                            </span>
                            ${task.label ? `<span class="tag ${labelClass}">${getLabelText(task.label)}</span>` : ''}
                            <span class="status ${statusClass}">
                                ${getStatusText(task.status)}
                            </span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Rechercher des tâches
        function searchTasks() {
            const searchTerm = searchInput.value.toLowerCase();
            if (!searchTerm) {
                renderTasks();
                return;
            }

            const filteredTasks = tasks.filter(task =>
                task.name.toLowerCase().includes(searchTerm) ||
                (task.label && getLabelText(task.label).toLowerCase().includes(searchTerm))
            );

            renderTasks(filteredTasks);
        }

        // Formater une date pour l'affichage
        function formatDate(dateString) {
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('fr-FR', options);
        }

        // Obtenir le texte de la priorité
        function getPriorityText(priority) {
            return {
                Importante: 'Importante',
                Moyenne: 'Moyenne',
                Faible: 'Faible'
            }[priority];
        }

        // Obtenir le texte de l'étiquette
        function getLabelText(label) {
            return {
                Travail: 'Travail',
                Personnel: 'Personnel',
                Etudes: 'Études',
                Activités : "Activités",
                Autre:"Autre"
            }[label] || label;
        }

        // Obtenir le texte du statut
        function getStatusText(status) {
            return {
                "En attente": 'En attente',
                'En cours': 'En cours',
                "Terminé": 'Terminé'
            }[status];
        }
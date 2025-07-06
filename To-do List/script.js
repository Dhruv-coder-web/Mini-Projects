class TaskManager {
      constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.init();
      }

      init() {
        this.loadTasks();
        this.renderTasks();
        this.setupEventListeners();
      }

      setupEventListeners() {
        const taskInput = document.getElementById('taskInput');
        taskInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            this.addTask();
          }
        });
      }

      addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskValue = taskInput.value.trim();
        
        if (taskValue !== '') {
          const task = {
            id: Date.now(),
            text: taskValue,
            completed: false,
            createdAt: new Date().toISOString()
          };
          
          this.tasks.unshift(task);
          taskInput.value = '';
          this.renderTasks();
        }
      }

      toggleTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
          this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
          this.renderTasks();
        }
      }

      deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.renderTasks();
      }

      editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
          const newText = prompt('Edit task:', task.text);
          if (newText && newText.trim() !== '') {
            task.text = newText.trim();
            this.renderTasks();
          }
        }
      }

      filterTasks(filter) {
        this.currentFilter = filter;
        
        document.querySelectorAll('.filter-tab').forEach(btn => {
          btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        this.renderTasks();
      }

      getFilteredTasks() {
        switch (this.currentFilter) {
          case 'active':
            return this.tasks.filter(task => !task.completed);
          case 'completed':
            return this.tasks.filter(task => task.completed);
          default:
            return this.tasks;
        }
      }

      renderTasks() {
        const tasksList = document.getElementById('tasksList');
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
          tasksList.innerHTML = `
            <div class="empty-state">
              <div class="empty-state-icon">📝</div>
              <div class="empty-state-text">No tasks yet</div>
              <div class="empty-state-subtext">Add a task above to get started</div>
            </div>
          `;
        } else {
          tasksList.innerHTML = filteredTasks.map(task => `
            <div class="task ${task.completed ? 'completed' : ''}">
              <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                   onclick="taskManager.toggleTask(${task.id})"></div>
              <div class="task-text ${task.completed ? 'completed' : ''}" 
                   onclick="taskManager.toggleTask(${task.id})">${task.text}</div>
              <div class="task-actions">
                <button class="task-btn edit-btn" onclick="taskManager.editTask(${task.id})" title="Edit">✏️</button>
                <button class="task-btn delete-btn" onclick="taskManager.deleteTask(${task.id})" title="Delete">🗑️</button>
              </div>
            </div>
          `).join('');
        }
        
        this.updateStats();
      }

      updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const active = total - completed;
        const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
        
        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('activeTasks').textContent = active;
        document.getElementById('completionRate').textContent = completionRate + '%';
        
        const circleProgress = document.getElementById('circleProgress');
        const progressPercentage = document.getElementById('progressPercentage');
        
        const offset = 100 - completionRate;
        circleProgress.style.strokeDashoffset = offset;
        progressPercentage.textContent = completionRate + '%';
      }

      loadTasks() {
        this.tasks = [
          {
            id: 1,
            text: "Welcome to your clean task manager!",
            completed: false,
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            text: "Try adding a new task",
            completed: false,
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            text: "Click to mark tasks as complete",
            completed: true,
            createdAt: new Date().toISOString()
          }
        ];
      }
    }

    const taskManager = new TaskManager();

    function addTask() {
      taskManager.addTask();
    }

    function filterTasks(filter) {
      taskManager.filterTasks(filter);
    }
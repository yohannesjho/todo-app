document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoTitleInput = document.getElementById('todo-title');
    const todoList = document.getElementById('todo-list');
  
    // Fetch and display to-dos
    async function fetchTodos() {
      const response = await fetch('/todos');
      const todos = await response.json();
      todoList.innerHTML = '';
      todos.forEach(addTodoToDOM);
    }
  
    // Add a new to-do item to the DOM
    function addTodoToDOM(todo) {
      const li = document.createElement('li');
      li.className = 'todo-item';
      li.dataset.id = todo._id;
      li.innerHTML = `
        <span>${todo.title}</span>
        <button onclick="deleteTodo('${todo._id}')">Delete</button>
        <button onclick="toggleComplete('${todo._id}', ${todo.completed})">
          ${todo.completed ? 'Undo' : 'Complete'}
        </button>
      `;
      todoList.appendChild(li);
    }
  
    // Add a new to-do
    todoForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const title = todoTitleInput.value;
      const response = await fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      const newTodo = await response.json();
      addTodoToDOM(newTodo);
      todoTitleInput.value = '';
    });
  
    // Delete a to-do
    window.deleteTodo = async (id) => {
      await fetch(`/todos/${id}`, { method: 'DELETE' });
      document.querySelector(`[data-id='${id}']`).remove();
    };
  
    // Toggle to-do completion
    window.toggleComplete = async (id, currentStatus) => {
      await fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus })
      });
      fetchTodos(); // Refresh the list
    };
  
    // Initial fetch
    fetchTodos();
  });
  
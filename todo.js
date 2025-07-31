let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.priority} ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <strong>${task.title}</strong><br/>
      ${task.description ? `<small>${task.description}</small><br/>` : ""}
      ${task.dueDate ? `<small>Due: ${task.dueDate}</small><br/>` : ""}
      <div class="actions">
        <button class="complete">${task.completed ? "Unmark" : "Complete"}</button>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

    // Complete
    li.querySelector(".complete").onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    // Edit
    li.querySelector(".edit").onclick = () => {
      const newTitle = prompt("Edit task title:", task.title);
      if (newTitle) task.title = newTitle;

      const newDesc = prompt("Edit description:", task.description);
      task.description = newDesc;

      const newDue = prompt("Edit due date (YYYY-MM-DD):", task.dueDate);
      task.dueDate = newDue;

      saveTasks();
      renderTasks();
    };

    // Delete
    li.querySelector(".delete").onclick = () => {
      if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    };
    taskList.appendChild(li);
  });
}

// Add Task
taskForm.onsubmit = (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const dueDate = document.getElementById("due-date").value;
  const priority = document.getElementById("priority").value;

  if (!title) return alert("Task title is required!");

  tasks.push({
    title,
    description,
    dueDate,
    priority,
    completed: false
  });
  saveTasks();
  renderTasks();
  taskForm.reset();
};
// Initial render
renderTasks();
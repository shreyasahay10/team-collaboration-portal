const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const logoutButton = document.getElementById("logoutButton");

addTaskButton.addEventListener("click", () => {
    const taskName = prompt("Enter task name:");

    if (!taskName) {
        return;
    }

    const task = document.createElement("div");

    task.innerHTML = `
        <p><strong>${taskName}</strong></p>
    `;

    task.style.padding = "12px 0";
    task.style.borderBottom = "1px solid #eee";

    taskList.appendChild(task);
});

logoutButton.addEventListener("click", () => {
    alert("Logout functionality will be connected later.");
});
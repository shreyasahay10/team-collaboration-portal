const API_URL = "http://m3oajod3fxccapjhq6t7qmk0.187.127.155.207.sslip.io";

const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const logoutButton = document.getElementById("logoutButton");

async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/api/tasks`);
        const tasks = await response.json();

        taskList.innerHTML = "";

        if (tasks.length === 0) {
            taskList.innerHTML = "<p>No tasks available.</p>";
            return;
        }

        tasks.forEach((task) => {
            const taskElement = document.createElement("div");

            taskElement.innerHTML = `
                <p><strong>${task.title}</strong></p>
            `;

            taskElement.style.padding = "12px 0";
            taskElement.style.borderBottom = "1px solid #eee";

            taskList.appendChild(taskElement);
        });
    } catch (error) {
        console.error("Failed to load tasks:", error);
        taskList.innerHTML = "<p>Failed to load tasks.</p>";
    }
}

addTaskButton.addEventListener("click", async () => {
    const taskName = prompt("Enter task name:");

    if (!taskName) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: taskName
            })
        });

        if (!response.ok) {
            throw new Error("Failed to create task");
        }

        await loadTasks();
    } catch (error) {
        console.error(error);
        alert("Failed to save task.");
    }
});

logoutButton.addEventListener("click", () => {
    alert("Logout functionality will be connected later.");
});

loadTasks();